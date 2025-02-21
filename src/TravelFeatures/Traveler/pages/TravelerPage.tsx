import { Breadcrumb } from '@/TravelCore/Components/Epic/Breadcrumb.tsx';
import { HeaderTraveler } from '@/TravelCore/Components/Epic/HeaderTraveler.tsx';
import { TravelerForm } from "@/TravelCore/Components/Epic/TravelerForm.tsx";
import { EmergencyContact } from "@/TravelCore/Components/Epic/EmergencyContact.tsx";
import { PurchaseDetails } from "@/TravelCore/Components/Epic/PurchaseDetails.tsx";
import { GoBack } from "@/TravelCore/Components/Raw/GoBack.tsx";
import { ContinuarButton } from "@/TravelCore/Components/Raw/ContinuarButton.tsx";
import { useTranslation } from "react-i18next";
import useData from "@/TravelCore/Hooks/useData.ts";
import {useState, useCallback, useEffect} from "react";
import {PaxForm, Pax} from "@/TravelCore/Utils/interfaces/Order.ts";
import {calculateAge} from "@/TravelCore/Utils/dates.ts"
import {createTravelers} from "@/TravelCore/Utils/object.ts"
import {Masters} from "@/TravelFeatures/Traveler/model/masters_entity.ts";
import {useNavigate} from "react-router-dom";
import useMasters from "@/TravelCore/Hooks/useMasters.ts";

export default function TravelForm() {
  const { t } = useTranslation(["traveler"]);
  const masterContext = useMasters();
  const {data, setData} = useData() || {};
  const navigate = useNavigate();
  const [travelersData, setTravelersData] = useState<PaxForm[]>([])
  const [emergencyContact, setEmergencyContact] = useState({});

    useEffect(() => {
        setTravelersData(data.travelersData)
        setEmergencyContact(data.emergencyContactData)

        console.log('rescatando el estado', travelersData, data.travelersData)
    }, []);

  const travelers = createTravelers(data.payloadOrder.cantidadPax, data.payloadOrder.edades)

  const handleSendTravelers = async () => {
      console.log(';;;;;;;;;;;;;;: ', travelersData);
/*

      const paxArray: Pax[] = travelersData
          .filter((item): item is NonNullable<typeof item> => item !== undefined)
          .map((item) => ({
              apellidos: item.lastName,
              apellidosContactoEmergencia: emergencyContact.lastName,
              document: item.documentNumber,
              edad: calculateAge(item.birthdate),
              email: item.email,
              idNacionalidad: item.nationality,
              idPais: item.residenceCountry,
              idTipoDocumento: parseInt(item.documentType),
              medical: "",
              nacimientos: item.birthdate,
              nombre: item.firstName,
              nombresContactoEmergencia: emergencyContact.firstName,
              sexo: item.gender,
              telefono1ContactoEmergencia: emergencyContact.phone1,
              telefonos: emergencyContact.phone2
          }));

      console.log('guardando travelersData: ', travelersData, paxArray);
*/

      setData?.((prevData: any) => ({
              ...prevData,
              travelersData: travelersData.filter((item) => item !== undefined),
              emergencyContactData: emergencyContact
          })
      )

      const masters = new Masters();
      const resp = await masters.getCitiesByCountry({countryId: travelersData.filter((item) => item !== undefined)[0].residenceCountry})
      console.log('resp cities', resp)
      if (resp && resp.data) {
          if (masterContext) {
              masterContext['cities'].setData(resp.data);
          }
          setTimeout(() => {
              console.log('redirigiendo a /invoice')
              navigate('/invoice'); // Navegar a la siguiente pantalla
          }, 1000);
      }
  };

  const handleChangeTravelers = useCallback( (index: number, name: string, value: string) => {
    setTravelersData((prevData) => {
      const updatedTravelers = [...prevData];
      updatedTravelers[index] = {
        ...updatedTravelers[index],
        [name]: value,
      };
      return updatedTravelers;
    });

  }, [])

  const handleChangeEmergency = (name, value) => {
    setEmergencyContact((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
console.log('emergency state: ', emergencyContact)
  return (
    <>
      <Breadcrumb />
      <main className="max-w-6xl mx-auto p-4 my-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <GoBack title={t("label-back-to-coverages")} url="quote/travel" />
        <section className="grid md:grid-cols-[1fr_400px] gap-6 my-2">
          <section className="space-y-4 items-center">
            <HeaderTraveler traveler={travelers} />
            <form className="border border-gray-200 rounded-2xl space-y-4">
              {travelers.map((traveler) => (
                <TravelerForm key={traveler.id} traveler={traveler} onChangeField={handleChangeTravelers} data={travelersData}/>
              ))}
              <EmergencyContact data={emergencyContact} onChangeField={handleChangeEmergency}/>
            </form>
          </section>
          <PurchaseDetails button={<ContinuarButton onClick={handleSendTravelers}/>} />
        </section>
      </main>
    </>
  );
}