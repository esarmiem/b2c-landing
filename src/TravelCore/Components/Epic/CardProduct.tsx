import { useState } from "react";
import { CircleCheck } from "lucide-react";
import ModalUpgrades from "./ModalUpgrades";
import {Plan} from "@/TravelCore/Utils/interfaces/Order.ts";
import {useTranslation} from "react-i18next";
import {formatCurrency} from "@/TravelCore/Utils/format.ts"
import useData from "@/TravelCore/Hooks/useData.ts";

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
}

const CardProduct = ({ Categoria, nombre, Valor, ValorPesos, DescripcionDescuentosDolares, DescripcionDescuentosPesos, cobertura, TipoViaje, IdPlan, viewType = "grid"}: Plan) => {
  const { t } = useTranslation(["products"]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { i18n } = useTranslation();
  const {setData} = useData() || {};


const rawPrice = i18n.language === "es" ? ValorPesos : Valor
  const price = i18n.language === "es" ? formatCurrency(rawPrice, 'COP') : formatCurrency(rawPrice, 'USD')
  const recommended = DescripcionDescuentosDolares.porcentaje !== '0'
  const originalPrice = recommended ? i18n.language === "es" ? formatCurrency(DescripcionDescuentosPesos.valorTotal.toString(), 'COP') : formatCurrency(DescripcionDescuentosDolares.valorTotal.toString(), 'USD') : ""

  // 🔹 Función para abrir el modal
  const openModal = () => {
    setData?.((prevData) => ({
          ...prevData,
          selectedPlan: IdPlan
        })
    )
    setSelectedProduct({
      id: IdPlan,
      name: Categoria,
      price: parseFloat(rawPrice),
      description: "",
    });
    setIsModalOpen(true);
  };

  // 🔹 Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {viewType === "list" ? (
        <div className="flex border-2 border-neutral-800 rounded-3xl overflow-hidden">
          <div
            className={`w-1/2 flex flex-col text-center justify-around ${
              recommended ? "bg-red-800 text-white" : "bg-zinc-100 text-neutral-800"
            }`}
          >
            {recommended && (
              <div className="mt-0 text-sm font-extrabold bg-stone-800 text-white px-2 py-1 rounded mx-auto">
                {DescripcionDescuentosDolares.porcentaje}% OFF
              </div>
            )}
            <div className="space-y-1 py-8">
              <h2 className="font-bold text-2xl">{Categoria}</h2>
              <p className={` ${recommended ? "text-red-100" : "text-neutral-800"}`}>
                {nombre}
              </p>
              <p className="font-bold">{t("label-total-price")}</p> 
              <p className={`mt-1 text-4xl font-bold ${recommended ? "text-neutral-100" : "text-red-600"}`}>
                {price} <span className='text-lg'>{i18n.language === "es" ? "COP" : "USD"}</span>
              </p>
              <p className={`line-through font-semibold text-lg ${recommended ? "text-black" : "text-neutral-400"}`}>
                {originalPrice} <span className='text-sm'>{i18n.language === "es" ? "COP" : "USD"}</span>
              </p>
            </div>
            <div className="bg-stone-800 text-white py-2 text-center text-sm w-100 mb-0">Ideal para {TipoViaje}</div>
          </div>
          <div className="w-1/2 p-4 flex flex-col justify-between">
            <ul className="mt-2 space-y-1 max-h-[170px] overflow-y-auto">
              {cobertura.map((detail, idx) => (
                <li key={idx} className="flex items-center gap-1 text-sm">
                  <CircleCheck className="w-3 h-3 text-green-500" />
                  {detail.name}
                </li>
              ))}
            </ul>
            <div className="mt-4 text-center space-y-3">
              <a href="#" className="text-xs text-blue-600 hover:underline font-semibold">
                {t("link-view-coverage-details")} 
                Ver detalles de <span className="font-bold">{cobertura.length} coberturas</span>
              </a>
              <button
                className="w-full bg-red-500 text-white py-2 px-4 rounded-full font-bold hover:bg-red-700 transition-all"
                onClick={openModal}
              >
                {t("button-select")} 
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-neutral-800 overflow-hidden grid">
          <section>
            <div
                className={`relative text-center px-1 py-8 ${recommended ? "bg-red-800 text-white" : "bg-zinc-100 text-neutral-800"}`}>
              {recommended && (
                  <div
                      className="text-white font-extrabold text-sm py-1 px-3 bg-stone-800 rounded-lg absolute top-0 left-1/2 transform -translate-x-1/2">
                    {DescripcionDescuentosDolares.porcentaje}% OFF
                  </div>
              )}
              <h2 className="font-bold text-2xl my-4">{Categoria}</h2>
              <p className={`my-0 ${recommended ? "text-white" : "text-neutral-800"}`}>{nombre}</p>
              <p className="mt-1 font-bold">Precio Total</p>
              <h3 className={`text-4xl font-bold ${recommended ? "text-white" : "text-red-600"}`}>{price} <span
                  className='text-lg'>{i18n.language === "es" ? "COP" : "USD"}</span></h3>
              <span className={`${recommended ? "text-black" : "text-neutral-400"} font-semibold line-through text-lg`}>
                 {originalPrice} <span className='text-sm'>{i18n.language === "es" ? "COP" : "USD"}</span>
              </span>
            </div>
            <div className="bg-stone-800 text-white py-2 text-center text-xs font-semibold">Ideal para {TipoViaje}</div>
          </section>
          <section className="flex flex-col justify-between">

            <div className="p-3 space-y-3 max-h-60 overflow-y-auto">
              <ul className="text-sm text-gray-600 mb-3 ">
                {cobertura.map((detail, idx) => (
                    <li key={idx} className="flex items-start mb-2 gap-1 font-bold">
                      <CircleCheck className="h-3 w-3 text-green-500 mt-1 flex-shrink-0"/>
                      {detail.name}
                    </li>
                ))}
              </ul>
            </div>

            <div className="p-3 space-y-1 text-center bg-white">
              <button
                  className="bg-red-500 text-white py-3 px-4 rounded-full w-full font-bold hover:bg-red-700 transition-all"
                  onClick={openModal}
              >
                Seleccionar
              </button>
              <a href="#" className="text-xs text-blue-600 hover:underline font-medium">
                Ver detalles de <span className="font-bold">{cobertura.length} coberturas</span>
              </a>
            </div>
          </section>
        </div>
      )}

      {/* 🔹 Modal dentro del return y usando estados correctamente */}
      {isModalOpen && (
          <ModalUpgrades isOpen={isModalOpen} onClose={closeModal} product={selectedProduct}/>
      )}
    </>
  );
};

export default CardProduct;