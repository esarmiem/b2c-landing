import { Breadcrumb } from '@/TravelCore/Components/Epic/Breadcrumb'
import CardProduct from '@/TravelCore/Components/Epic/CardProduct.tsx'
import DropdownFiltersProducts from '@/TravelCore/Components/Epic/DropdownFiltersProducts'
import { FilterForm } from '@/TravelCore/Components/Epic/FilterForm'
import useData from '@/TravelCore/Hooks/useData.ts'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUtilsValidations } from '@/TravelCore/Utils/validations/useUtilsValidations.ts'
import Loader from '@/TravelCore/Components/Raw/Loader.tsx'

const TripQuotePage: React.FC = () => {
  const { t } = useTranslation(['products'])
  const [visibleCount, setVisibleCount] = useState(4)
  const { data } = useData() || {}
  const plans = data?.responseOrder?.planes || []

  // Loading
  const [isLoading, setIsLoading] = useState(false)

  //Filters
  const [viewType, setViewType] = useState<'list' | 'grid'>('grid')
  const [selectedSort, setSelectedSort] = useState<'highPrice' | 'lowPrice' | 'highCoverage' | 'popular'>('popular')

  const toggleVisibility = () => {
    setVisibleCount(visibleCount === plans.length ? 4 : plans.length)
  }

  // Validaciones
  const validationRules = { travelers: { requiredAge: true, minAge: true } }

  const { errors, handleChangeValidate, validateFormData } = useUtilsValidations(validationRules)

  const handleChange = (field: string, value: string) => {
    handleChangeValidate(field, value)
  }

  // clases condicionales para el contenedor basado en el tipo de vista
  // Definimos las clases condicionales:
  // Si viewType es "list", usamos una grilla de 1 columna; si es "grid", usamos varias columnas.
  const containerClasses =
    viewType === 'list'
      ? 'grid grid-cols-1 gap-4'
      : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center'

  return (
    <>
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50 z-50">
            <Loader />
          </div>
        )}
        <div className={`${isLoading ? 'pointer-events-none blur-sm' : ''}`}>
          <Breadcrumb />
          <FilterForm errors={errors} validateFormData={validateFormData} handleChange={handleChange} setIsLoading={setIsLoading} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="flex justify-between items-center">
              <h3 className="font-display tracking-tight font-bold text-slate-900 md:text-3xl">{t('label-trip-assistance')}</h3>
              <DropdownFiltersProducts setViewType={setViewType} setSelectedSort={setSelectedSort} selectedSort={selectedSort} />
            </div>
            <div className="max-w-7xl mx-auto py-4">
              <div className={containerClasses}>
                {plans
                  .sort((a, b) => {
                    switch (selectedSort) {
                      case 'highPrice':
                        return Number.parseFloat(b.Valor) - Number.parseFloat(a.Valor)
                      case 'lowPrice':
                        return Number.parseFloat(a.Valor) - Number.parseFloat(b.Valor)
                      case 'highCoverage':
                        return b.cobertura.length - a.cobertura.length
                      case 'popular':
                        return (
                          Number.parseFloat(b.DescripcionDescuentosDolares.porcentaje) -
                          Number.parseFloat(a.DescripcionDescuentosDolares.porcentaje)
                        )
                      default:
                        return 0
                    }
                  })
                  .slice(0, visibleCount)
                  .map(plan => (
                    <CardProduct 
                      key={plan.Id} 
                      viewType={viewType} 
                      plan={plan} 
                      isNewlyVisible={visibleCount > 4 && plan.Id > 4} 
                    />
                  ))}
              </div>
              <div className="mx-auto my-3 p-4 align-middle text-center">
                {plans.length > 4 && (
                  <button
                  type="button"
                  className="bg-transparent hover:bg-zinc-500 text-zinc-700 font-semibold hover:text-white py-2 px-4 border border-zinc-500 hover:border-transparent rounded transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-zinc-400 active:scale-95"
                  onClick={toggleVisibility}
                >
                  {visibleCount === plans.length ? 'Ver menos' : 'Ver más opciones'}
                </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TripQuotePage
