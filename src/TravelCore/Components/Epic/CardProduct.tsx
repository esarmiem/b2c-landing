import useData from '@/TravelCore/Hooks/useData.ts'
import { formatCurrency } from '@/TravelCore/Utils/format.ts'
import type { Cobertura, Plan } from '@/TravelCore/Utils/interfaces/Order.ts'
import { CircleCheck } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ModalProductDetails from './ModalProductDetails'
import ModalUpgrades from './ModalUpgrades'
import { useHomeState } from '@/TravelFeatures/TripQuote/stateHelper/useHomeState.ts'

interface CardProductProps {
  plan: Plan
  viewType: 'list' | 'grid'
  isNewlyVisible?: boolean
  setIsGoTraveler: (value: boolean) => void
  isGoTraveler: boolean
}

const CardProduct = ({ plan, viewType, isNewlyVisible = false, setIsGoTraveler, isGoTraveler }: CardProductProps) => {
  const animationClass = isNewlyVisible ? 'animate-fadeIn' : ''
  const { t } = useTranslation(['products'])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { i18n } = useTranslation()
  const { setData } = useData() || {}
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const {
    // isLoading,
    // productUpgrades,
    // hasUpgrades,
    numberTravellers,
    // currentTraveler,
    setCurrentTraveler,
    // currentTravellerData,
    allTravellers,
    // toggleUpgrade,
    totalTravelersPerPlan,
    // totalTravelerUpgrades,
    // totalTravelerPlanWithUpgrades,
    totalAllTravelers
  } = useHomeState(isModalOpen, plan)

  const rawPrice = i18n.language.startsWith('es') ? plan.ValorPesos : plan.Valor
  const price = i18n.language.startsWith('es') ? formatCurrency(rawPrice, 'COP') : formatCurrency(rawPrice, 'USD')
  const recommended = plan.DescripcionDescuentosDolares.porcentaje !== '0'

  const originalPrice = (() => {
    if (!recommended) return ''
    return i18n.language.startsWith('es')
      ? formatCurrency(plan.DescripcionDescuentosPesos.valorTotal.toString(), 'COP')
      : formatCurrency(plan.DescripcionDescuentosDolares.valorTotal.toString(), 'USD')
  })()

  const productDetails = {
    name: plan.Categoria,
    subtitle: plan.nombre,
    typeOfProduct: plan.TipoViaje,
    price: price,
    originalPrice: originalPrice,
    details: plan.cobertura.map((detail: Cobertura) => detail.name)
  }

  const openModal = useCallback(() => {
    if (setData) {
      setData(prevData => ({
        ...prevData,
        selectedPlan: plan.IdPlan
      }))
    }
    setIsModalOpen(true)
  }, [plan.IdPlan, setData])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const openDetailsModal = useCallback(() => {
    setIsDetailsModalOpen(true)
  }, [])

  const closeDetailsModal = useCallback(() => {
    setIsDetailsModalOpen(false)
  }, [])

  useEffect(() => {
    if (isGoTraveler) {
      closeModal()
    }
  }, [isGoTraveler, closeModal])

  return (
    <>
      {viewType === 'list' ? (
        <div className={`flex border-2 border-neutral-800 rounded-3xl overflow-hidden ${animationClass}`}>
          <div
            className={`w-1/2 flex flex-col text-center justify-around ${
              recommended ? 'bg-red-800 text-white' : 'bg-zinc-100 text-neutral-800'
            }`}
          >
            {recommended && (
              <div className="mt-0 text-sm font-extrabold bg-stone-800 text-white px-2 py-1 rounded mx-auto">
                {plan.DescripcionDescuentosDolares.porcentaje}% OFF
              </div>
            )}
            <div className="space-y-1 py-8">
              <h2 className="font-bold text-2xl">{plan.Categoria}</h2>
              <p className={` ${recommended ? 'text-red-100' : 'text-neutral-800'}`}>{plan.nombre}</p>
              <p className="font-bold">{t('label-total-price')}</p>
              <p className={`mt-1 text-4xl font-bold ${recommended ? 'text-neutral-100' : 'text-red-600'}`}>
                {price} <span className="text-lg">{i18n.language.startsWith('es') ? 'COP' : 'USD'}</span>
              </p>
              {recommended && (
                <p className="line-through font-semibold text-lg text-black">
                  {originalPrice} <span className="text-sm">{i18n.language.startsWith('es') ? 'COP' : 'USD'}</span>
                </p>
              )}
            </div>
            <div className="bg-stone-800 text-white py-2 text-center text-sm w-100 mb-0">
              {t('label-ideal-for')} {plan.TipoViaje}
            </div>
          </div>
          <div className="w-1/2 p-4 flex flex-col justify-between">
            <ul className="mt-2 space-y-1 max-h-[170px] overflow-y-auto">
              {plan.cobertura.slice(0, 3).map(detail => (
                <li key={detail.id_benefit} className="flex items-center gap-1 text-sm">
                  <CircleCheck className="w-3 h-3 text-green-500" />
                  {detail.name}
                </li>
              ))}
            </ul>
            <div className="mt-4 text-center space-y-3">
              <button type="button" onClick={openDetailsModal} className="text-xs text-blue-600 hover:underline font-semibold">
                {t('link-view-coverage-details')}{' '}
                <span className="font-bold">
                  {plan.cobertura.length} {t('label-coverage')}
                </span>
              </button>
              <button
                type="button"
                className="w-full bg-red-500 text-white py-2 px-4 rounded-full font-bold hover:bg-red-700 transition-all"
                onClick={openModal}
              >
                {t('button-select')}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={`rounded-3xl border-2 border-neutral-800 overflow-hidden grid ${animationClass}`}>
          <section>
            <div className={`relative text-center px-1 py-8 ${recommended ? 'bg-red-800 text-white' : 'bg-zinc-100 text-neutral-800'}`}>
              {recommended && (
                <div className="text-white font-extrabold text-sm py-1 px-3 bg-stone-800 rounded-lg absolute top-0 left-1/2 transform -translate-x-1/2">
                  {plan.DescripcionDescuentosDolares.porcentaje}% OFF
                </div>
              )}
              <h2 className="font-bold text-2xl my-3">{plan.Categoria}</h2>
              <p
                className={`h-12 flex items-center justify-center leading-tight line-clamp-2 ${recommended ? 'text-red-100' : 'text-neutral-800'}`}
              >
                {plan.nombre}
              </p>
              <p className="font-bold">Precio Total</p>
              <h3 className={`text-4xl font-bold ${recommended ? 'text-white' : 'text-red-600'}`}>
                {price} <span className="text-xs">{i18n.language.startsWith('es') ? 'COP' : 'USD'}</span>
              </h3>
              {recommended && (
                <span className={`${recommended ? 'text-black' : 'text-neutral-400'} font-semibold line-through text-lg`}>
                  {originalPrice} <span className="text-sm">{i18n.language.startsWith('es') ? 'COP' : 'USD'}</span>
                </span>
              )}
            </div>
            <div className="bg-stone-800 text-white py-2 text-center text-xs font-semibold">
              {t('label-ideal-for')} {plan.TipoViaje}
            </div>
          </section>
          <section className="flex flex-col justify-between">
            <div className="p-3 space-y-3 max-h-60 overflow-y-auto">
              <ul className="text-sm text-gray-600 mb-3 ">
                {plan.cobertura.slice(0, 3).map(detail => (
                  <li key={detail.id_benefit} className="flex items-start mb-2 gap-1 font-bold">
                    <CircleCheck className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                    {detail.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 space-y-1 text-center bg-white">
              <button
                type="button"
                className="bg-red-500 text-white py-3 px-4 rounded-full w-full font-bold hover:bg-red-700 transition-all"
                onClick={openModal}
              >
                {t('button-select')}
              </button>
              <button type="button" onClick={openDetailsModal} className="text-xs text-blue-600 hover:underline font-medium">
                {t('link-view-coverage-details')}{' '}
                <span className="font-bold">
                  {plan.cobertura.length} {t('label-coverage')}
                </span>
              </button>
            </div>
          </section>
        </div>
      )}
      {isModalOpen && (
        <ModalUpgrades
          // isLoading={isLoading}
          // productUpgrades={productUpgrades}
          // hasUpgrades={hasUpgrades}
          numberTravellers={numberTravellers}
          // currentTraveler={currentTraveler}
          setCurrentTraveler={setCurrentTraveler}
          // currentTravellerData={currentTravellerData}
          allTravellers={allTravellers}
          // toggleUpgrade={toggleUpgrade}
          isOpen={isModalOpen}
          onClose={closeModal}
          totalTravelersPerPlan={totalTravelersPerPlan}
          // totalTravelerUpgrades={totalTravelerUpgrades}
          // totalTravelerPlanWithUpgrades={totalTravelerPlanWithUpgrades}
          totalAllTravelers={totalAllTravelers}
          setIsGoTraveler={setIsGoTraveler}
        />
      )}
      {isDetailsModalOpen && <ModalProductDetails isOpen={isDetailsModalOpen} onClose={closeDetailsModal} product={productDetails} />}
    </>
  )
}

export default CardProduct
