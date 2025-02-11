import React from 'react';
import CardProduct from './CardProduct';

interface ProductsRowProps {
  viewType: 'list' | 'grid';
}

const ProductsRow: React.FC<ProductsRowProps> = ({ viewType }) => {
  const cardData = [
    {
      title: 'DISCOVER',
      subtitle: 'Protección básica 22.000 USD',
      price: 'US$ 22.000',
      originalPrice: 'US$ 30.000',
      typeOfProduct: 'Ideal para: VACACIONES',
      details: [
        'Asistencia médica por accidente USD 35,000/EUR 35,000',
        'Cancelación e interrupción Multicausa de viaje contratado',
        'Robo o Pérdida de pasaporte exclusivamente en viaje USD 70.00',
        'Cobertura deportes amateur USD 1,000.00',
        'Demora de vuelo = Sala VIP (A partir de 60 minutos) Incluido'
      ],
    },
    {
      title: 'DISCOVER',
      subtitle: 'Protección standard 35.000 USD',
      price: 'US$ 35.000',
      originalPrice: 'US$ 50.000',
      typeOfProduct: 'Ideal para: VACACIONES',
      details: [
        'Asistencia médica por accidente USD 35,000/EUR 35,000',
        'Cancelación e interrupción Multicausa de viaje contratado',
        'Robo o Pérdida de pasaporte exclusivamente en viaje USD 70.00',
        'Cobertura deportes amateur USD 1,000.00',
        'Demora de vuelo = Sala VIP (A partir de 60 minutos) Incluido'
      ],
      recommended: true
    },
    {
      title: 'DISCOVER',
      subtitle: 'Protección especial 55.000 USD',
      price: 'US$ 55.000',
      originalPrice: 'US$ 75.000',
      typeOfProduct: 'Ideal para: VACACIONES',
      details: [
        'Asistencia médica por accidente USD 35,000/EUR 35,000',
        'Cancelación e interrupción Multicausa de viaje contratado',
        'Robo o Pérdida de pasaporte exclusivamente en viaje USD 70.00',
        'Cobertura deportes amateur USD 1,000.00',
        'Demora de vuelo = Sala VIP (A partir de 60 minutos) Incluido'
      ],
      recommended: false,
    },
    {
      title: 'DISCOVER',
      subtitle: 'Protección ideal 110.000 USD',
      price: 'US$ 110.000',
      originalPrice: 'US$ 150.000',
      typeOfProduct: 'Ideal para: VACACIONES',
      details: [
        'Asistencia médica por accidente USD 35,000/EUR 35,000',
        'Cancelación e interrupción Multicausa de viaje contratado',
        'Robo o Pérdida de pasaporte exclusivamente en viaje USD 70.00',
        'Cobertura deportes amateur USD 1,000.00',
        'Demora de vuelo = Sala VIP (A partir de 60 minutos) Incluido'
      ],
    },
  ];

  // Definimos las clases condicionales:
  // Si viewType es "list", usamos una grilla de 1 columna; si es "grid", usamos varias columnas.
  const containerClasses =
    viewType === 'list'
      ? 'grid grid-cols-1 gap-4'
      : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center';

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className={containerClasses}>
        {cardData.map((card, index) => (
          <CardProduct key={index} viewType={viewType} {...card} />
        ))}
      </div>
    </div>
  );
};

export default ProductsRow;
