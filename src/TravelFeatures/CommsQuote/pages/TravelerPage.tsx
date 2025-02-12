import {Breadcrumb} from '@/TravelCore/Components/Epic/Breadcrumb'
import {HeaderTraveler} from '@/TravelCore/Components/Epic/HeaderTraveler.tsx'
import {TravelerForm} from "@/TravelCore/Components/Epic/TravelerForm.tsx";
import {EmergencyContact} from "@/TravelCore/Components/Epic/EmergencyContact.tsx";
import {PurchaseDetails} from "@/TravelCore/Components/Epic/PurchaseDetails.tsx";
import {GoBack} from "@/TravelCore/Components/Raw/GoBack.tsx";
import {ContinuarButton} from "@/TravelCore/Components/Raw/ContinuarButton.tsx";

export default function TravelForm() {
  const travelers = [
    { id: 1, age: "35 Años", phone: "Teléfono" },
    { id: 2, age: "20 Años", phone: "Teléfono" },
  ]

  return (
    <>
      <Breadcrumb />
        <main className="max-w-6xl mx-auto p-4 my-6">
          <GoBack title="Volver a las coberturas" url="#" />
          <section className="grid md:grid-cols-[1fr_400px] gap-6 my-2">
            <section className="space-y-4 items-center">
              <HeaderTraveler traveler={travelers} />
              <form className="border border-gray-200 rounded-2xl space-y-4">
                {travelers.map((traveler) => (<TravelerForm traveler={traveler} />))}
                <EmergencyContact />
              </form>
            </section>
            <PurchaseDetails button={<ContinuarButton/>} />
          </section>
        </main>
    </>
  )
}