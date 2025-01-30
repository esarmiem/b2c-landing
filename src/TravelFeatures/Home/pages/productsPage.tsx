// import { useTranslation } from "react-i18next";

// const ProductsPage: React.FC = () => {
//     const { t, i18n } = useTranslation(["products"])

//     const handleGoTravel = async (): Promise<void> => {
//         console.log("Click en producto seguro de viaje");
//     };

//     const handleGoComms = async (): Promise<void> => {
//         console.log("Click en producto comunicaciones");
//     };

//     const handleChangeLang = async (data: string): Promise<void> => {
//         console.log("Click en cambiar idioma a: ", data);
//         i18n.changeLanguage(data)
//     };

//     return (
//         <>
//             <div className="font-bold text-xl mb-2">{t("title", {branch: "Travelkit"})}</div>
//             <p>{t("paragraph", {branch: "Travelkit"})}</p>

//             <button onClick={handleGoTravel}
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
//                 {t("label-btn-travel",{})}
//             </button>

//             <button onClick={handleGoComms}
//                     className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full">
//                 {t("label-btn-comms", {})}
//             </button>

//             <div className="px-6 pt-4 pb-2">
//                 <span onClick={()=> handleChangeLang("en")} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">EN</span>
//                 <span onClick={()=> handleChangeLang("es")} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">ES</span>
//             </div>

//         </>
//     );
// };

// export default ProductsPage;

import { WhyChooseUs } from "@/TravelCore/Components/Epic/productsPage/WhyChooseUs";
import { Certifications } from "@/TravelCore/Components/Epic/productsPage/Certifications";
import { Features } from "@/TravelCore/Components/Epic/productsPage/Features";
import { Testimonials } from "@/TravelCore/Components/Epic/productsPage/Testimonials";
import { Stats } from "@/TravelCore/Components/Epic/productsPage/Stats";
import { HeroCarousel } from "@/TravelCore/Components/Epic/productsPage/HeroCarousel";
import { TravelForm } from "@/TravelCore/Components/Epic/productsPage/TravelForm"

const ProductsPage = () => {
  return (
    <>
      <HeroCarousel />
      <TravelForm />
      <WhyChooseUs />
      <Certifications />
      <Features />
      <Testimonials />
      <Stats />
    </>
  );
};

export default ProductsPage;
