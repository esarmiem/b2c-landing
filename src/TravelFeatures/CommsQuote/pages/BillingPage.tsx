import {Breadcrumb} from "@/TravelCore/Components/Epic/Breadcrumb.tsx";
import {ProcessButton} from "@/TravelCore/Components/Epic/ProcessButton.tsx";
import {PurchaseDetails} from "@/TravelCore/Components/Epic/PurchaseDetails.tsx";
import {GoBack} from "@/TravelCore/Components/Raw/GoBack.tsx";
import {HeaderBilling} from "@/TravelCore/Components/Epic/HeaderBilling.tsx";
import {BillingForm} from "@/TravelCore/Components/Epic/BillingForm.tsx";

export default function BillingPage() {

  return (
    <>
      <Breadcrumb />
      <main className="max-w-6xl mx-auto p-4 my-6">
        <GoBack title="Volver a la informacion de pasajeros" url="#" />
        <section className="grid md:grid-cols-[1fr_400px] gap-6 my-2">
          <section className="space-y-4 items-center">
            <HeaderBilling />
            <form className="border border-gray-200 rounded-2xl space-y-4">
              <BillingForm />
            </form>
          </section>
          <PurchaseDetails button={<ProcessButton />} />
        </section>
      </main>
    </>
  )
}