import React from 'react';
import { CircleCheck } from "lucide-react"

interface CardProductProps {
  title: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  typeOfProduct: string;
  details: string[];
  recommended?: boolean;
}

const CardProduct: React.FC<CardProductProps> = ({ title, subtitle, price, originalPrice, details, typeOfProduct, recommended }) => {
  return (
    <div className="max-w-[320px] rounded-3xl border-2 border-neutral-800 relative overflow-hidden">
      <div className={` text-center px-1 py-8 ${recommended ? 'bg-red-800 text-white' : 'bg-zinc-100 text-neutral-800'}`}>
        {recommended && (
          <div className="text-white font-bold text-sm py-1 px-3 bg-stone-800 rounded-lg absolute top-0 left-1/2 transform -translate-x-1/2">
            Recomendado
          </div>
        )}
        <h2 className="font-bold text-2xl my-4">{title}</h2>
        <div className="space-y-0 text-base font-bold">
          <p className={`my-0 ${recommended ? 'text-white' : 'text-neutral-800'}`}>
            {subtitle}
          </p>
          <p className="mt-1">Precio Total</p>
        </div>
        <div className="space-y-1">
          <h3 className={`text-4xl font-bold ${recommended ? 'text-white' : 'text-red-800'}`}>{price}</h3>
          <span className={`${recommended ? 'text-[rgb(203,71,71)]' : 'text-neutral-800'} line-through text-sm`}>{originalPrice}</span>
        </div>
      </div>
      <div className="bg-stone-800 text-white py-2 text-center text-sm">{typeOfProduct}</div>
      <div className="p-3 space-y-3">
        <ul className="text-sm text-gray-600 mb-3">
          {details.map((detail, idx) => (
            <li key={idx} className="flex items-top mb-2 gap-1 font-bold">
              <CircleCheck className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
              {detail}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-3 space-y-1 text-center">
        <button className="bg-red-500 text-white py-3 px-4 rounded-full w-full font-bold">
          Seleccionar
        </button>
        <a href="#" className="text-xs text-blue-600 hover:underline">
          VER DETALLES DE COBERTURA
        </a>
      </div>
    </div>
  );
};

export default CardProduct;
