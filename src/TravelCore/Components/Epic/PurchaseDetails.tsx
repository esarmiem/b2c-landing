import { Card, CardContent } from '@/components/ui/card.tsx'
import { ShoppingCart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import useData from '@/TravelCore/Hooks/useData.ts'
import { calculateDaysBetweenDates } from '@/TravelCore/Utils/dates.ts'
import { formatCurrency } from '@/TravelCore/Utils/format.ts' // Importar useTranslation
import useMasters from '@/TravelCore/Hooks/useMasters'
import payment from "../../../../Assets/payment-methods.webp"

export function PurchaseDetails({ button }: { button: JSX.Element }) {
  const { t } = useTranslation(['traveler']) // Obtener la función de traducción
  const { data } = useData() || {}
  const { arrivals } = useMasters() || {}

  const orderData = data?.payloadOrder
  const destino = arrivals?.data?.items.find(arrival => arrival.idDestino === orderData?.destino)?.descripcion
  const quantityTravelers = (orderData?.cantidadPax ?? 0) > 1 ? 'travelers' : 'traveler'
  const savedResponseOrder = data?.responseOrder
  const selPlan = data?.selectedPlan
  const selectedPlan = savedResponseOrder?.planes.find(plan => plan.IdPlan === selPlan)

  //Upgrades Data
  const upgradesData = data?.travelerQuotation
  const totalUpgradesDolar = upgradesData?.travellers.reduce(
    (totalUpgrades, traveler) => totalUpgrades + Number.parseFloat(traveler?.valorUpgradesDolar),
    0
  )
  const totalUpgradesPesos = upgradesData?.travellers.reduce(
    (totalUpgrades, traveler) => totalUpgrades + Number.parseFloat(traveler?.valorUpgradesPesos),
    0
  )
  const totalAllTravelers = upgradesData?.totalAllTravelersPesos
  const discountPesos = upgradesData?.descriptionDescuentosPesos
  const discountDollars = upgradesData?.descriptionDescuentosDolares
  const discountValidatePesos = discountPesos && discountPesos.porcentaje !== '0'
  const discountValidateDollars = discountDollars && discountDollars.porcentaje !== '0'

  return (
    <section className="space-y-4">
      <Card>
        <CardContent className="p-0">
          <div className="bg-red-900 text-white p-4 flex items-center gap-1 rounded-t-xl">
            <div className="w-12 h-12 m-3 rounded-full bg-red-800 flex items-center justify-center">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <div className="flex flex-col p-0">
              <h1 className="font-medium text-xl">{t('label-purchase-details')}</h1>
              <p className="text-sm mt-1">
                {`${destino}, ${calculateDaysBetweenDates(orderData?.salida || '', orderData?.llegada || '')} ${t('days')}, ${orderData?.cantidadPax ?? 0} ${t(quantityTravelers)}`}
              </p>
            </div>
          </div>

          <div className="p-4 space-y-4 mb-4">
            <div className="space-y-2 md:mb-16 sm:mb-8">
              <div className="flex justify-between border-b border-gray-200">
                <span className="text-sm font-bold text-gray-950">{t('label-number-of-travelers')}</span>
                <span className="text-sm font-semibold">{orderData?.cantidadPax || ''}</span>
              </div>
              <section className={`${discountValidatePesos ? 'border-b-2 border-y-gray-950 space-y-2 md:mb-16 sm:mb-8' : ''}`}>
                <>
                  {discountValidatePesos && (
                    <>
                      <span className="text-sm font-bold">{t('label-value-in-cop')}</span>
                      <div className="flex justify-between border-b border-gray-200">
                        <span className="text-sm text-gray-600">{t('label-total-without-descuentos')}</span>
                        <span className="text-sm font-semibold line-through text-red-700">
                          {formatCurrency(discountPesos.valorTotal.toString(), 'COP')} COP
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200">
                        <span className="text-sm text-gray-600">{`${t('label-discount')} ${discountPesos.porcentaje}%`}</span>
                        <span className="text-sm font-semibold">- {formatCurrency(discountPesos.valorDescuento, 'COP')} COP</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between border-b border-gray-200">
                    <span className="text-sm text-gray-600">
                      {discountValidatePesos ? t('label-product-value-single') : t('label-product-value-cop')}
                    </span>
                    <span className={`text-sm font-semibold ${discountValidatePesos ? 'text-green-500' : ''}`}>
                      {formatCurrency(selectedPlan?.ValorPesos || '', 'COP')} COP
                    </span>
                  </div>
                </>
              </section>
              <section className={`${discountValidateDollars ? 'border-b-2 border-y-gray-950 space-y-2 md:mb-16 sm:mb-8' : ''}`}>
                <>
                  {discountValidateDollars && (
                    <>
                      <span className="text-sm font-bold">{t('label-value-in-usd')}</span>
                      <div className="flex justify-between border-b border-gray-200">
                        <span className="text-sm text-gray-600">{t('label-total-without-descuentos')}</span>
                        <span className="text-sm font-semibold line-through text-red-700">
                          {formatCurrency(discountDollars.valorTotal.toString(), 'USD')} USD
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200">
                        <span className="text-sm text-gray-600">{`${t('label-discount')} ${discountDollars.porcentaje}%`}</span>
                        <span className="text-sm font-semibold">- {formatCurrency(discountDollars.valorDescuento, 'USD')} USD</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between border-b border-gray-200">
                    <span className="text-sm text-gray-600">
                      {discountValidateDollars ? t('label-product-value-single') : t('label-product-value-usd')}
                    </span>
                    <span className={`text-sm font-semibold ${discountValidateDollars ? 'text-green-500' : ''}`}>
                      {formatCurrency(selectedPlan?.Valor || '', 'USD')} USD
                    </span>
                  </div>
                </>
              </section>
              <div className="flex justify-between border-b border-gray-200">
                <span className="text-sm text-gray-600">{t('label-price-per-traveler-cop')}</span>
                <span className="text-sm font-semibold">{formatCurrency(selectedPlan?.ValorPaxPesos || '', 'COP')} COP</span>
              </div>
              <div className="flex justify-between border-b border-gray-200">
                <span className="text-sm text-gray-600">{t('label-price-per-traveler-usd')}</span>
                <span className={`text-sm font-semibold ${discountValidateDollars ? '' : 'text-red-700'}`}>
                  {formatCurrency(selectedPlan?.ValorPax || '', 'USD')} USD
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="font-bold text-red-700">{t('label-upgrades-summary')}</h1>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{t('label-total-upgrades')}</span>
                <span className="text-sm text-gray-600">{formatCurrency(totalUpgradesPesos?.toString() ?? '', 'COP')} COP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{t('label-total-usd')}</span>
                <span className="text-sm text-gray-600">{formatCurrency(totalUpgradesDolar?.toString() ?? '', 'USD')} USD</span>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between text-lg">
                <span className="font-semibold">{t('label-total')}</span>
                <span className="font-semibold">{formatCurrency(totalAllTravelers ?? '', 'COP')} COP</span>
              </div>
            </div>
          </div>

          <div className="p-4">{button}</div>
        </CardContent>
      </Card>

      <div className="flex justify-center items-center p-4">
        <img src={payment} alt="payment methods" className="w-full h-auto max-w-[1020px]" />
      </div>
    </section>
  )
}
