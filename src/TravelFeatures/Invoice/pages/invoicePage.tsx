import { Breadcrumb } from "@/TravelCore/Components/Epic/Breadcrumb.tsx";
import { GoBack } from "@/TravelCore/Components/Raw/GoBack.tsx";
import { HeaderBilling } from "@/TravelCore/Components/Epic/HeaderBilling.tsx";
import { BillingForm } from "@/TravelCore/Components/Epic/BillingForm.tsx";
import { PurchaseDetails } from "@/TravelCore/Components/Epic/PurchaseDetails.tsx";
import { ProcessButton } from "@/TravelCore/Components/Epic/ProcessButton.tsx";
import useData from "@/TravelCore/Hooks/useData.ts";
import {useCallback, useState} from "react";
import {PaxForm} from "@/TravelCore/Utils/interfaces/Order.ts";
import {Masters} from "@/TravelFeatures/Traveler/model/masters_entity.ts";
import useMasters from "@/TravelCore/Hooks/useMasters.ts";

export default function InvoicePage() {
    const {data, setData} = useData() || {};
    const [billingData, setBillingData] = useState<PaxForm[]>([])

    const handleChangeReuseInfo = (name, value) => {
        /*setEmergencyContact((prevData) => ({
            ...prevData,
            [name]: value,
        }));*/

    };

    const handleSendBilling = async () => {
        //const masters = new Masters();
        //const resp = await masters.getCitiesByCountry({countryId: travelersData.filter((item) => item !== undefined)[0].residenceCountry})

        //TODO: Mapping data object and send data traveler and billing

        setData?.((prevData: any) => ({
                ...prevData,
                billingData: billingData
            })
        )
        alert('Se envia a pasarela de pagos ePayco.... En proceso')
        /*setTimeout(() => {
            console.log('redirigiendo a /invoice')
            //navigate('/invoice/billingResult'); // Navegar a la siguiente pantalla
        }, 1000);*/

    }

    const handleChangeBilling = useCallback( (name: string, value: string) => {
        setBillingData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    }, [])

console.log('billingData', billingData)
        return (
        <>
            <Breadcrumb />
            <main className="max-w-6xl mx-auto p-4 my-6">
                <GoBack title="Volver a la informacion de pasajeros" url="/traveler" />
                <section className="grid md:grid-cols-[1fr_400px] gap-6 my-2">
                    <section className="space-y-4 items-center">
                        <HeaderBilling />
                        <form className="border border-gray-200 rounded-2xl space-y-4">
                            <BillingForm onChangeField={handleChangeBilling} data={billingData}/>
                        </form>
                    </section>
                    <PurchaseDetails button={<ProcessButton onClick={handleSendBilling} />} />
                </section>
            </main>
            {/*<p>Facturacion y pago</p>*/}
            {/*<button onClick={handleCheckPreOrder}>Confirmar</button>*/}
            {/*<button onClick={handleAddOrder}>Pagar</button>*/}
        </>
    );
}