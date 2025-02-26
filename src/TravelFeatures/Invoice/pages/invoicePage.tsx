import { Breadcrumb } from "@/TravelCore/Components/Epic/Breadcrumb.tsx";
import { GoBack } from "@/TravelCore/Components/Raw/GoBack.tsx";
import { HeaderBilling } from "@/TravelCore/Components/Epic/HeaderBilling.tsx";
import { BillingForm } from "@/TravelCore/Components/Epic/BillingForm.tsx";
import { PurchaseDetails } from "@/TravelCore/Components/Epic/PurchaseDetails.tsx";
import { ProcessButton } from "@/TravelCore/Components/Epic/ProcessButton.tsx";
import useData from "@/TravelCore/Hooks/useData.ts";
import { useCallback, useState } from "react";
import { PaxForm } from "@/TravelCore/Utils/interfaces/Order.ts";

export default function InvoicePage() {
    const { setData } = useData() || {};
    const [billingData, setBillingData] = useState<PaxForm[]>([{} as PaxForm]); // Inicializa con un objeto vacío

    const handleSendBilling = async () => {
        // Guarda los datos de facturación en el contexto o estado global
        setData?.((prevData: any) => ({
            ...prevData,
            billingData: billingData,
        }));
        alert('Se envia a pasarela de pagos ePayco.... En proceso');
    };

    // Función para manejar cambios en los campos del formulario
    const handleChangeBilling = useCallback((index: number, name: string, value: string) => {
        setBillingData((prevData) => {
            const newData = [...prevData];
            newData[index] = {
                ...newData[index],
                [name]: value,
            };
            return newData;
        });
    }, []);

    console.log('billingData', billingData); // Para depuración

    return (
        <>
            <Breadcrumb />
            <main className="max-w-6xl mx-auto p-4 my-6">
                <GoBack title="Volver a la informacion de pasajeros" url="/traveler" />
                <section className="grid md:grid-cols-[1fr_400px] gap-6 my-2">
                    <section className="space-y-4 items-center">
                        <HeaderBilling />
                        <form className="border border-gray-200 rounded-2xl space-y-4">
                            {/* Pasa la función handleChangeBilling y los datos actuales */}
                            <BillingForm onChangeField={handleChangeBilling} data={billingData} />
                        </form>
                    </section>
                    <PurchaseDetails button={<ProcessButton onClick={handleSendBilling} />} />
                </section>
            </main>
        </>
    );
}