import { useState } from "react";
import { CircleCheck } from "lucide-react";
import ModalUpgrades from "./ModalUpgrades";

interface CardProductProps {
  title: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  typeOfProduct: string;
  details: string[];
  recommended?: boolean;
  viewType?: "list" | "grid";
}

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
}

const CardProduct: React.FC<CardProductProps> = ({
  title,
  subtitle,
  price,
  originalPrice,
  details,
  typeOfProduct,
  recommended,
  viewType = "grid",
}) => {
  // 🔹 Estados del modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔹 Función para abrir el modal
  const openModal = () => {
    console.log("Abriendo modal");
    setSelectedProduct({
      id: "1",
      name: title,
      price: parseFloat(price.replace(/[^0-9.]/g, "")), // ✅ Limpia caracteres no numéricos
      description: "", // ✅ Evita undefined en description
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
              <div className="mt-0 text-xs font-normal bg-stone-800 text-white px-2 py-1 rounded mx-auto">
                Recomendado
              </div>
            )}
            <div className="space-y-1 py-8">
              <h2 className="font-bold text-2xl">{title}</h2>
              <p className={`font-bold ${recommended ? "text-red-100" : "text-neutral-800"}`}>
                {subtitle}
              </p>
              <p className="font-bold">Precio Total</p>
              <p className={`mt-1 text-4xl font-bold ${recommended ? "text-neutral-100" : "text-red-600"}`}>
                {price}
              </p>
              <p className={`line-through ${recommended ? "text-[rgb(203,71,71)]" : "text-neutral-400"}`}>
                {originalPrice}
              </p>
            </div>
            <div className="bg-stone-800 text-white py-2 text-center text-sm w-100">{typeOfProduct}</div>
          </div>
          <div className="w-1/2 p-4 flex flex-col justify-between">
            <ul className="mt-2 space-y-1">
              {details.map((detail, idx) => (
                <li key={idx} className="flex items-center gap-1 text-sm">
                  <CircleCheck className="w-3 h-3 text-green-500" />
                  {detail}
                </li>
              ))}
            </ul>
            <div className="mt-4 text-center space-y-3">
              <a href="#" className="text-xs text-blue-600 hover:underline font-semibold">
                VER DETALLES DE COBERTURA
              </a>
              <button
                className="w-full bg-red-500 text-white py-2 px-4 rounded-full font-bold hover:bg-red-700 transition-all"
                onClick={openModal}
              >
                Seleccionar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-neutral-800 relative overflow-hidden">
          <div className={`text-center px-1 py-8 ${recommended ? "bg-red-800 text-white" : "bg-zinc-100 text-neutral-800"}`}>
            {recommended && (
              <div className="text-white font-normal text-sm py-1 px-3 bg-stone-800 rounded-lg absolute top-0 left-1/2 transform -translate-x-1/2">
                Recomendado
              </div>
            )}
            <h2 className="font-bold text-2xl my-4">{title}</h2>
            <p className={`my-0 ${recommended ? "text-white" : "text-neutral-800"}`}>{subtitle}</p>
            <p className="mt-1">Precio Total</p>
            <h3 className={`text-4xl font-bold ${recommended ? "text-white" : "text-red-600"}`}>{price}</h3>
            <span className={`${recommended ? "text-[rgb(203,71,71)]" : "text-neutral-400"} font-semibold line-through text-sm`}>
              {originalPrice}
            </span>
          </div>
          <div className="bg-stone-800 text-white py-2 text-center text-xs font-semibold">{typeOfProduct}</div>
          <div className="p-3 space-y-3">
            <ul className="text-sm text-gray-600 mb-3">
              {details.map((detail, idx) => (
                <li key={idx} className="flex items-start mb-2 gap-1 font-bold">
                  <CircleCheck className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-3 space-y-1 text-center">
            <button
              className="bg-red-500 text-white py-3 px-4 rounded-full w-full font-bold hover:bg-red-700 transition-all"
              onClick={openModal}
            >
              <a href="/client-data" className="text-white hover:bg-red-700">
                Seleccionar</a>
            </button>
            <a href="#" className="text-xs text-blue-600 hover:underline font-semibold">
              VER DETALLES DE COBERTURA
            </a>
          </div>
        </div>
      )}

      {/* 🔹 Modal dentro del return y usando estados correctamente */}
      {isModalOpen && (
        <ModalUpgrades isOpen={isModalOpen} onClose={closeModal} product={selectedProduct} />
      )}
    </>
  );
};

export default CardProduct;
