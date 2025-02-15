import React from 'react';
import CardProduct from './CardProduct';
import {Plan} from "@/TravelCore/Utils/interfaces/Order.ts";

interface ProductsRowProps {
  viewType: 'list' | 'grid';
  plans: Plan[]
}

const ProductsRow: React.FC<ProductsRowProps> = ({ viewType, plans }) => {
  // Definimos las clases condicionales:
  // Si viewType es "list", usamos una grilla de 1 columna; si es "grid", usamos varias columnas.
  const containerClasses =
    viewType === 'list'
      ? 'grid grid-cols-1 gap-4'
      : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center';

  return (
    <div className="max-w-6xl mx-auto py-4">
      <div className={containerClasses}>
        {plans.map((plan, index) => (
          <CardProduct key={index} viewType={viewType} {...plan} />
        ))}
      </div>
    </div>
  );
};

export default ProductsRow;
