import React,{useState} from 'react';
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
    
    {
      title: 'DISCOVER',
      subtitle: 'Protección especial 666 USD',
      price: 'US$ 666',
      originalPrice: 'US$ 50.000',
      typeOfProduct: 'Ideal para: Prueba',
      details: [
        'Asistencia médica por accidente USD 35,000/EUR 35,000',
        'Cancelación e interrupción Multicausa de viaje contratado',
        'Robo o Pérdida de pasaporte exclusivamente en viaje USD 70.00',
        'Cobertura deportes amateur USD 1,000.00',
        'Demora de vuelo = Sala VIP (A partir de 60 minutos) Incluido'
      ],
      recommended: false,
    },
  ];


  // Estado para controlar cuantos productos s emuestran 
  const [visibleCount, setVisibleCount] = useState(4);
  const toggleVisibility = () => {
    setVisibleCount(visibleCount === cardData.length ? 4 : cardData.length);
  };


  // Si viewType es "list", usamos una grilla de 1 columna; si es "grid", usamos varias columnas.
  const containerClasses =
    viewType === 'list'
      ? 'grid grid-cols-1 gap-4'
      : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center';

  return (
    <>
      <div className="max-w-6xl mx-auto py-4 transition-all">
        <div className={`${containerClasses} transition-all duration-500 ease-in-out`}>{/* Animacion para cuando se expande */}
          {cardData.slice(0,visibleCount).map((card, index) => (
            <CardProduct key={index} viewType={viewType} {...card} />
          ))}
        </div>
      </div>
      <div className="mx-auto my-3 p-4 align-middle text-center">
        {cardData.length > 4 && (
          <button
          className="bg-transparent hover:bg-zinc-500 text-zinc-700 font-semibold hover:text-white py-2 px-4 border border-zinc-500 hover:border-transparent rounded transition-all"
          onClick={toggleVisibility}>
          {visibleCount === cardData.length ? 'Ver menos' : 'Ver más opciones'}
        </button>
        )}
      </div>
    </>
  );
};

export default ProductsRow;
