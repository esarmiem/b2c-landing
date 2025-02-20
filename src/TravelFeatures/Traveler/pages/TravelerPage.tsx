import { Breadcrumb } from "@/TravelCore/Components/Epic/Breadcrumb.tsx";
import { HeaderTraveler } from "@/TravelCore/Components/Epic/HeaderTraveler.tsx";
import { TravelerForm } from "@/TravelCore/Components/Epic/TravelerForm.tsx";
import { EmergencyContact } from "@/TravelCore/Components/Epic/EmergencyContact.tsx";
import { PurchaseDetails } from "@/TravelCore/Components/Epic/PurchaseDetails.tsx";
import { GoBack } from "@/TravelCore/Components/Raw/GoBack.tsx";
import { ContinuarButton } from "@/TravelCore/Components/Raw/ContinuarButton.tsx";
import { useTranslation } from "react-i18next";
import useData from "@/TravelCore/Hooks/useData.ts";
import {useState, useCallback} from "react";
import {PaxForm, Pax} from "@/TravelCore/Utils/interfaces/Order.ts";
import {calculateAge} from "@/TravelCore/Utils/dates.ts"
import {Masters} from "@/TravelFeatures/Traveler/model/masters_entity.ts";
import {useNavigate} from "react-router-dom";
import useMasters from "@/TravelCore/Hooks/useMasters.ts";

/**
 * TravelForm
 *
 * Spanish:
 * Componente que renderiza el formulario de viaje. Este componente integra varios subcomponentes:
 * - Breadcrumb: muestra la ruta de navegación.
 * - HeaderTraveler: visualiza la información de los viajeros.
 * - TravelerForm: formulario individual para cada viajero.
 * - EmergencyContact: formulario para el contacto de emergencia.
 * - PurchaseDetails: muestra los detalles de la compra, incluyendo un botón para continuar.
 *
 * English:
 * Component that renders the travel form. This component integrates several subcomponents:
 * - Breadcrumb: displays the navigation path.
 * - HeaderTraveler: shows traveler information.
 * - TravelerForm: individual form for each traveler.
 * - EmergencyContact: form for emergency contact information.
 * - PurchaseDetails: displays purchase details, including a continue button.
 */
export default function TravelForm() {
  // Hook de traducción para obtener textos en distintos idiomas.
  // Translation hook to retrieve texts in different languages.
  const { t } = useTranslation(["traveler"]);
  // Array de viajeros con información traducida.
  // Array of travelers with translated information.
  const masterContext = useMasters();
  const {setData} = useData() || {};
  const navigate = useNavigate();
  const [travelersData, setTravelersData] = useState<PaxForm[]>([])
  const [emergencyContact, setEmergencyContact] = useState({
    firstName: "",
    lastName: "",
    phone1: "",
    phone2: "",
  });

  const travelers = [
    { id: 1, age: `35 ${t("label-years")}`, phone: t("label-phone") },
    { id: 2, age: `20 ${t("label-years")}`, phone: t("label-phone") },
    { id: 3, age: `25 ${t("label-years")}`, phone: t("label-phone") },
  ];

  const handleSendTravelers = async () => {
      console.log('guardando travelersData: ', travelersData);
      const mapDocumentType = (docType: string): number => {
          const types: { [key: string]: number } = {ce: 1, passport: 2};
          return types[docType] || 0;
      };

      const paxArray: Pax[] = travelersData
          .filter((item): item is NonNullable<typeof item> => item !== null)
          .map((item) => ({
              apellidos: item.lastName,
              apellidosContactoEmergencia: emergencyContact.lastName,
              document: item.documentNumber,
              edad: calculateAge(item.birthdate),
              email: item.email,
              idNacionalidad: item.nationality,
              idPais: item.residenceCountry,
              idTipoDocumento: mapDocumentType(item.documentType),
              medical: "",
              nacimientos: item.birthdate,
              nombre: item.firstName,
              nombresContactoEmergencia: emergencyContact.firstName,
              sexo: item.gender,
              telefono1ContactoEmergencia: emergencyContact.phone1,
              telefonos: emergencyContact.phone2
          }));

      setData?.((prevData) => ({
              ...prevData,
              travelersData: paxArray
          })
      )

      const masters = new Masters();
      const resp = await masters.getCitiesByCountry({countryId: paxArray[0].idPais})
      if (resp && resp > 0) {
          if (masterContext) {
              masterContext['cities'].setData(resp.data);
          }
          setTimeout(() => {
              navigate('/quote/travel'); // Navegar a la siguiente pantalla
          }, 1000);
      }
  };

  console.log('travelersData: ', travelersData)
  console.log('emergencyContact: ', emergencyContact)

  const handleChangeTravelers = useCallback( (index: number, name: string, value: string) => {
    console.log(`Cambiando ${name} del viajero ${index}:`, value);

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
    console.log(`Cambiando ${name}:`, value);
    setEmergencyContact((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
          <PurchaseDetails button={<ContinuarButton onClick={handleSendTravelers} url={"invoice"} />} />
        </section>
      </main>
    </>
  );
}
