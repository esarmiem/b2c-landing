import type { Plan } from '@/TravelCore/Utils/interfaces/Order.ts'
import { useState } from 'react'
import CardProduct from './CardProduct'

interface ProductsRowProps {
  viewType: 'list' | 'grid'
  plans: Plan[]
}

const ProductsRow: React.FC<ProductsRowProps> = ({ viewType, plans }) => {
  const [visibleCount, setVisibleCount] = useState(4)

  const toggleVisibility = () => {
    setVisibleCount(visibleCount === plans.length ? 4 : plans.length)
  }

  // clases condicionales para el contenedor basado en el tipo de vista
  // Definimos las clases condicionales:
  // Si viewType es "list", usamos una grilla de 1 columna; si es "grid", usamos varias columnas.
  const containerClasses =
    viewType === 'list'
      ? 'grid grid-cols-1 gap-4'
      : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center'

  return (
    <div className="max-w-6xl mx-auto py-4">
      <div className={containerClasses}>
        {plans.slice(0, visibleCount).map((plan, index) => (
          <CardProduct key={index} viewType={viewType} {...plan} />
        ))}
      </div>
      {/* boton para ver mas ver menos */}
      <div className="mx-auto my-3 p-4 align-middle text-center">
        {plans.length > 4 && (
          <button
            type="button"
            className="bg-transparent hover:bg-zinc-500 text-zinc-700 font-semibold hover:text-white py-2 px-4 border border-zinc-500 hover:border-transparent rounded transition-all"
            onClick={toggleVisibility}
          >
            {visibleCount === plans.length ? 'Ver menos' : 'Ver más opciones'}
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductsRow
