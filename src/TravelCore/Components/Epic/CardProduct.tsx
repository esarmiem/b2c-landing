import React from 'react';

interface CardProductProps {
  title: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  details: string[];
  recommended?: boolean;
}

const CardProduct: React.FC<CardProductProps> = ({ title, subtitle, price, originalPrice, details, recommended }) => {
  return (
    <div className={`border rounded-lg p-4 max-w-xs mx-auto border-2 border-neutral-800 ${recommended ? 'bg-red-500 text-white' : 'bg-white'}`}>
      {recommended && (
        <div className="text-white font-bold text-sm py-1 px-3 bg-red-700 rounded-full absolute top-3 right-3">
          Recomendado
        </div>
      )}
      <div className="text-center px-1">
        <h2 className="font-bold text-2xl mb-2">{title}</h2>    
        <h4 className={`text-base font-bold ${recommended ? 'text-white' : 'text-neutral-800'}`}>
            {subtitle}
        </h4>

      </div>
      <div className="my-3">
        <span className="text-lg font-semibold">{price}</span>
        <span className="line-through text-sm text-gray-500 ml-2">{originalPrice}</span>
      </div>
      <ul className="text-sm text-gray-600 mb-3">
        {details.map((detail, idx) => (
          <li key={idx} className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-green-500 mr-2">
              <path d="M13.646 4.646a1 1 0 0 1 0 1.414L6.707 12.707a1 1 0 0 1-1.414 0L2.354 9.854a1 1 0 0 1 1.414-1.414L6 10.586 12.232 4.646a1 1 0 0 1 1.414 0z" />
            </svg>
            {detail}
          </li>
        ))}
      </ul>
      <button className="bg-red-500 text-white py-2 px-4 rounded-full w-full">
        Seleccionar
      </button>
    </div>
  );
};

export default CardProduct;
