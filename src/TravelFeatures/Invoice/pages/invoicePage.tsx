import { useEffect } from "react";
import { Order } from "../model/order_entity";
import { Cities } from "../model/cities_entity";
import { Breadcrumb } from "@/TravelCore/Components/Epic/Breadcrumb.tsx";
import { GoBack } from "@/TravelCore/Components/Raw/GoBack.tsx";
import { HeaderBilling } from "@/TravelCore/Components/Epic/HeaderBilling.tsx";
import { BillingForm } from "@/TravelCore/Components/Epic/BillingForm.tsx";
import { PurchaseDetails } from "@/TravelCore/Components/Epic/PurchaseDetails.tsx";
import { ProcessButton } from "@/TravelCore/Components/Epic/ProcessButton.tsx";
import { useTranslation } from "react-i18next"; // Importar useTranslation

export default function InvoicePage() {

    return (
        <>
            <Breadcrumb />
            <main className="max-w-6xl mx-auto p-4 my-6">
                <GoBack title="Volver a la informacion de pasajeros" url="/traveler" />
                <section className="grid md:grid-cols-[1fr_400px] gap-6 my-2">
                    <section className="space-y-4 items-center">
                        <HeaderBilling />
                        <form className="border border-gray-200 rounded-2xl space-y-4">
                            <BillingForm />
                        </form>
                    </section>
                    <PurchaseDetails button={<ProcessButton url={"invoice/billingResult"} />} />
                </section>
            </main>
            {/*<p>Facturacion y pago</p>*/}
            {/*<button onClick={handleCheckPreOrder}>Confirmar</button>*/}
            {/*<button onClick={handleAddOrder}>Pagar</button>*/}
        </>
    );
}