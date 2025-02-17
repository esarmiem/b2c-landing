import { Breadcrumb } from '@/TravelCore/Components/Epic/Breadcrumb.tsx';
import { HeaderTraveler } from '@/TravelCore/Components/Epic/HeaderTraveler.tsx';
import { TravelerForm } from "@/TravelCore/Components/Epic/TravelerForm.tsx";
import { EmergencyContact } from "@/TravelCore/Components/Epic/EmergencyContact.tsx";
import { PurchaseDetails } from "@/TravelCore/Components/Epic/PurchaseDetails.tsx";
import { GoBack } from "@/TravelCore/Components/Raw/GoBack.tsx";
import { ContinuarButton } from "@/TravelCore/Components/Raw/ContinuarButton.tsx";
import { useTranslation } from "react-i18next"; 

export default function TravelForm() {
  const { t } = useTranslation(["traveler"]); 

  const travelers = [
    { id: 1, age: `35 ${t("label-years")}`, phone: t("label-phone") },
    { id: 2, age: `20 ${t("label-years")}`, phone: t("label-phone") },
    { id: 3, age: `25 ${t("label-years")}`, phone: t("label-phone") },
  ];

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
                <TravelerForm key={traveler.id} traveler={traveler} />
              ))}
              <EmergencyContact />
            </form>
          </section>
          <PurchaseDetails button={<ContinuarButton url={"invoice"} />} />
        </section>
      </main>
    </>
  );
}