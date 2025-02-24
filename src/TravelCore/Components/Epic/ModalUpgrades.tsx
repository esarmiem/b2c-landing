import Loader from '@/TravelCore/Components/Raw/Loader'
import useData from '@/TravelCore/Hooks/useData'
import { useTRMToday } from '@/TravelCore/Hooks/useTRMToday'
import { getProductUpdates } from '@/TravelCore/Services/Apis/Order'
import { formatCurrency } from '@/TravelCore/Utils/format'
import type { Product, Quotation, TravellerQuotation, Upgrade } from '@/TravelCore/Utils/interfaces/Order'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Check, HandHeart, Plus, UserRoundCog } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ModalUpgradesProps {
  isOpen: boolean
  onClose: () => void
  product: Product
}

const ModalUpgrades = ({ isOpen, onClose, product }: ModalUpgradesProps) => {
  const { t } = useTranslation(['products'])
  const { i18n } = useTranslation()
  const { data, setData } = useData() || {}
  const travelerQuotation = data?.travelerQuotation
  const numberTravellers = data?.payloadOrder?.cantidadPax || 1
  const [isLoading, setIsLoading] = useState(false)
  const [currentTraveler, setCurrentTraveler] = useState(1)
  const [productUpgrades, setProductUpgrades] = useState<Upgrade[]>([])
  const [TRM, setTRM] = useState<number>(0)
  const { fetchTRM } = useTRMToday()

  useEffect(() => {
    const shouldInitialize =
      !travelerQuotation || travelerQuotation.productId !== product.id || travelerQuotation.travellers.length !== numberTravellers

    if (shouldInitialize) {
      const initialTravellers: TravellerQuotation[] = Array.from({ length: numberTravellers }, (_, index) => ({
        id: index + 1,
        ValorPesos: product?.price.toString() || '0',
        valorUpgradesPesos: '0',
        valorUpgradesDolares: '0',
        upgrades: [],
        totalPlan: product?.price.toString() || '0'
      }))

      const initialQuotation: Quotation = {
        productId: product.id,
        travellers: initialTravellers,
        total: (product?.price * numberTravellers).toString() || '0'
      }

      setData?.(prevData => ({
        ...prevData,
        travelerQuotation: initialQuotation
      }))
    }
  }, [travelerQuotation, numberTravellers, product.id, product.price, setData])

  useEffect(() => {
    fetchTRM()
      .then(trmData => {
        setTRM(trmData)
      })
      .catch(error => {
        console.error('Error al consultar la TRM:', error)
      })
  }, [fetchTRM])

  const toggleUpgrade = (id_raider: string) => {
    if (!travelerQuotation || !setData) return

    const newTravellers = [...travelerQuotation.travellers]
    const travelerIndex = currentTraveler - 1
    const upgrade = productUpgrades.find(u => u.id_raider === id_raider)

    if (!upgrade) return

    const currentUpgrades = new Set(newTravellers[travelerIndex].upgrades)

    if (currentUpgrades.has(upgrade.name_raider)) {
      currentUpgrades.delete(upgrade.name_raider)
    } else {
      currentUpgrades.add(upgrade.name_raider)
    }

    const upgradesCost = Array.from(currentUpgrades).reduce((total, upgradeName) => {
      const foundUpgrade = productUpgrades.find(u => u.name_raider === upgradeName)
      const floatNumber = foundUpgrade?.cost_raider.replace('.', '')
      return total + (foundUpgrade ? Number.parseFloat(floatNumber as string) : 0)
    }, 0)

    const upgradesCostInDollars = Number.parseFloat((upgradesCost / TRM).toFixed(2))
    const totalPlanPerTraveler = product.price + upgradesCost
    const totalPlanPerTravelerDollars = product.price + upgradesCostInDollars

    newTravellers[travelerIndex] = {
      ...newTravellers[travelerIndex],
      upgrades: Array.from(currentUpgrades),
      valorUpgradesPesos: upgradesCost.toString(),
      valorUpgradesDolares: upgradesCostInDollars.toString(),
      totalPlan: (i18n.language === 'es' ? totalPlanPerTraveler : totalPlanPerTravelerDollars).toString()
    }

    const newTotal = newTravellers.reduce((sum, traveler) => sum + Number.parseFloat(traveler.totalPlan), 0).toString()

    setData(prevData => ({
      ...prevData,
      travelerQuotation: {
        productId: product.id,
        travellers: newTravellers,
        total: newTotal
      }
    }))
  }

  useEffect(() => {
    const updateProduct = async () => {
      setIsLoading(true)
      try {
        const response = await getProductUpdates({
          id_plan: product?.id.toString(),
          language: i18n.language === 'es' ? 'spa' : i18n.language === 'en' ? 'eng' : ''
        })
        setProductUpgrades(response)
      } catch (error) {
        console.error('Error loading upgrades:', error)
      } finally {
        setIsLoading(false)
      }
    }
    updateProduct()
  }, [product.id, i18n.language])

  const currentTravellerData = travelerQuotation?.travellers[currentTraveler - 1]
  const allTravellers = travelerQuotation?.travellers

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-lg p-6 rounded-xl">
        <DialogHeader>
          <div className="grid items-center justify-between w-full space-y-2">
            <DialogTitle className="text-2xl font-bold">{t('label-upgrades')}</DialogTitle>
            <div className={`flex items-center gap-2 ${numberTravellers === 1 ? 'hidden' : ''}`}>
              {allTravellers?.map((traveller, index) => (
                <button
                  key={traveller.id}
                  type="button"
                  onClick={() => setCurrentTraveler(index + 1)}
                  className={`flex items-center p-1 rounded-lg hover:bg-gray-200 hover:text-gray-700 ${
                    currentTraveler === index + 1 ? 'bg-red-500 text-white' : ''
                  }`}
                >
                  <UserRoundCog className="w-4 h-4" />
                  <span className="text-xs font-medium ml-1">
                    {t('label-traveler')} {index + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <DialogDescription className="text-gray-600">{t('label-select-additional-benefits')}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 max-h-60 overflow-y-auto">
          {isLoading && (
            <div className="w-full flex items-center justify-center">
              <Loader />
            </div>
          )}
          {productUpgrades.map(upgrade => (
            <button
              type="button"
              key={upgrade.id_raider}
              className={`w-full flex items-center justify-between p-3 rounded-lg border transition ${
                currentTravellerData?.upgrades.includes(upgrade.name_raider)
                  ? 'bg-green-100 border-green-500'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => toggleUpgrade(upgrade.id_raider)}
            >
              <div className="flex items-center text-start gap-3 w-full">
                <span className="text-xl">
                  <HandHeart />
                </span>
                <div className="w-full">
                  <p className="font-medium text-sm">{t(upgrade.name_raider)}</p>
                  <p className="text-xs text-gray-500">
                    {upgrade.cost_raider} {t('label-cop-per-person')}
                  </p>
                </div>
                <span className="text-xl">
                  {currentTravellerData?.upgrades.includes(upgrade.name_raider) ? (
                    <Check className="text-green-600" />
                  ) : (
                    <Plus className="text-gray-600" />
                  )}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <p className="text-sm font-medium">{t('label-product-value-per-traveler')}</p>
            <p className="font-bold text-red-950">
              {currentTravellerData?.ValorPesos
                ? formatCurrency(currentTravellerData.ValorPesos, i18n.language === 'es' ? 'COP' : 'USD')
                : 'N/A'}{' '}
              {i18n.language === 'es' ? 'COP' : 'USD'}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-bold text-red-500">{t('label-upgrades')}</p>
            <p className="font-bold text-red-500">
              {currentTravellerData?.valorUpgradesPesos
                ? formatCurrency(
                    i18n.language === 'es' ? currentTravellerData.valorUpgradesPesos : currentTravellerData.valorUpgradesDolares,
                    i18n.language === 'es' ? 'COP' : 'USD'
                  )
                : 'N/A'}{' '}
              {i18n.language === 'es' ? 'COP' : 'USD'}
            </p>
          </div>
          <div className={`flex justify-between ${numberTravellers === 1 ? 'hidden' : ''}`}>
            <p className="text-sm font-medium">{t('label-product-value-per-traveler-upgrades')}</p>
            <p className="font-bold text-red-950">
              {currentTravellerData?.totalPlan
                ? formatCurrency(currentTravellerData.totalPlan, i18n.language === 'es' ? 'COP' : 'USD')
                : 'N/A'}{' '}
              {i18n.language === 'es' ? 'COP' : 'USD'}
            </p>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <p>{t('label-total')}</p>
            <p className="text-red-950">
              {travelerQuotation?.total ? formatCurrency(travelerQuotation.total, i18n.language === 'es' ? 'COP' : 'USD') : 'N/A'}{' '}
              {i18n.language === 'es' ? 'COP' : 'USD'}
            </p>
          </div>
        </div>

        <a href="/traveler" className="w-full rounded-full">
          <button type="button" className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600">
            {t('button-continue')}
          </button>
        </a>
      </DialogContent>
    </Dialog>
  )
}

export default ModalUpgrades
