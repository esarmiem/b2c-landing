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
  const { t } = useTranslation(["invoice"]); // Obtener la función de traducción

  // useEffect(() => {
  //     getCitiesByCountry();
  // }, []);
  //
  // const getCitiesByCountry = async (): Promise<void> => {
  //     const cities = new Cities();
  //     const response: any = await cities.getCitiesByCountry(1233);
  //     if (response && response.data && !response.error) {
  //         console.log("getCitiesByCountry recibida: ", response.data);
  //     } else {
  //         console.log("falló getCitiesByCountry");
  //     }
  // };
  //
  // const handleCheckPreOrder = async (): Promise<void> => {
  //     const order = new Order();
  //     const response: any = await order.checkPreOrder({});
  //     if (response && response.data && !response.error) {
  //         console.log("handleCheckPreOrder recibidas: ", response.data);
  //     } else {
  //         console.log("falló handleCheckPreOrder");
  //     }
  // };
  //
  // const handleAddOrder = async (): Promise<void> => {
  //     const order = new Order();
  //     const response: any = await order.checkPreOrder({});
  //     if (response && response.data && !response.error) {
  //         console.log("handleAddOrder recibidas: ", response.data);
  //     } else {
  //         console.log("falló handleAddOrder");
  //     }
  // };

  return (
    <>
      <Breadcrumb />
      <main className="max-w-6xl mx-auto p-4 my-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <GoBack title={t("label-back-to-passenger-info")} url="/client-data" />
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