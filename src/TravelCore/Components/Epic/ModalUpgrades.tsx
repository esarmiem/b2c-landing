import Loader from '@/TravelCore/Components/Raw/Loader'
import useData from '@/TravelCore/Hooks/useData'
import { useTRMToday } from '@/TravelCore/Hooks/useTRMToday'
import { getProductUpdates } from '@/TravelCore/Services/Apis/Order'
import { formatCurrency } from '@/TravelCore/Utils/format'
import type { Plan, Quotation, TravellerQuotation, Upgrade } from '@/TravelCore/Utils/interfaces/Order'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Check, HandHeart, Plus, UserRoundCog } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ModalUpgradesProps {
  isOpen: boolean
  onClose: () => void
  plan: Plan
}

const ModalUpgrades = ({ isOpen, onClose, plan }: ModalUpgradesProps) => {
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

  const fetchedRef = useRef(false)
  const productIdRef = useRef<string | number | null>(null)
  const languageRef = useRef<string | null>(null)

  const currentLanguage = i18n.language === 'es' ? 'spa' : i18n.language === 'en' ? 'eng' : ''

  // Inicialización de la cotización - solo cuando es necesario
  useEffect(() => {
    const shouldInitialize =
      !travelerQuotation || travelerQuotation.planId !== plan.IdPlan || travelerQuotation.travellers.length !== numberTravellers

    if (shouldInitialize && setData) {
      const initialTravellers: TravellerQuotation[] = Array.from({ length: numberTravellers }, (_, index) => ({
        id: index + 1,
        totalPlanTravelerPesos: plan.ValorPaxPesos || '0',
        totalPlanTravelerDolar: plan.ValorPax || '0',
        totalPlanWhitUpgradesPerTravelerPeso: plan.ValorPaxPesos || '0',
        totalPlanWhitUpgradesPerTravelerDolar: plan.ValorPax || '0',
        valorUpgradesPesos: '0',
        valorUpgradesDolar: '0',
        upgrades: []
      }))

      const initialQuotation: Quotation = {
        planId: plan.IdPlan,
        totalAllTravelersPesos: plan.ValorPesos || '0',
        totalAllTravelersDolar: plan.Valor || '0',
        travellers: initialTravellers
      }

      setData(prevData => ({
        ...prevData,
        travelerQuotation: initialQuotation
      }))
    }
  }, [travelerQuotation, numberTravellers, plan.IdPlan, plan.ValorPesos, plan.Valor, setData])

  // Obtener TRM una sola vez
  useEffect(() => {
    if (TRM === 0) {
      fetchTRM()
        .then(trmData => {
          setTRM(trmData)
        })
        .catch(error => {
          console.error('Error al consultar la TRM:', error)
        })
    }
  }, [fetchTRM, TRM])

  // Función para cargar upgrades
  const loadProductUpgrades = useCallback(async () => {
    if (!isOpen || isLoading) return

    // Verificamos si ya hemos cargado para este producto e idioma
    if (
      fetchedRef.current &&
      productIdRef.current === plan.IdPlan &&
      languageRef.current === currentLanguage &&
      productUpgrades.length > 0
    ) {
      return
    }

    setIsLoading(true)
    try {
      const response = await getProductUpdates({
        id_plan: plan.IdPlan.toString(),
        language: currentLanguage
      })

      setProductUpgrades(response)

      fetchedRef.current = true
      productIdRef.current = plan.IdPlan
      languageRef.current = currentLanguage
    } catch (error) {
      console.error('Error loading upgrades:', error)
    } finally {
      setIsLoading(false)
    }
  }, [isOpen, isLoading, plan.IdPlan, currentLanguage, productUpgrades.length])

  useEffect(() => {
    if (isOpen) {
      if (productIdRef.current !== plan.IdPlan || languageRef.current !== currentLanguage) {
        fetchedRef.current = false
      }

      loadProductUpgrades()
    }
    return () => {
      if (!isOpen) fetchedRef.current = false
    }
  }, [isOpen, loadProductUpgrades, plan.IdPlan, currentLanguage])

  const toggleUpgrade = useCallback(
    (id_raider: string, name_raider: string) => {
      if (!travelerQuotation || !setData) return

      const newTravellers = [...travelerQuotation.travellers]
      const travelerIndex = currentTraveler - 1
      const upgrade = productUpgrades.find(u => u.id_raider === id_raider)

      if (!upgrade) return

      const currentUpgrades = [...newTravellers[travelerIndex].upgrades]
      const existingUpgradeIndex = currentUpgrades.findIndex(u => u.id === id_raider)

      if (existingUpgradeIndex === -1) {
        currentUpgrades.push({ id: id_raider, name: name_raider })
      } else {
        currentUpgrades.splice(existingUpgradeIndex, 1)
      }

      // Corregir cálculos
      const upgradesCost = currentUpgrades.reduce((total, upgrade) => {
        const foundUpgrade = productUpgrades.find(u => u.id_raider === upgrade.id)
        const cost = foundUpgrade?.cost_raider.replace(/[.,]/g, '') || '0'
        return total + Number.parseInt(cost, 10)
      }, 0)

      const upgradesCostInDollars = Number((upgradesCost / TRM).toFixed(2))
      const totalPlanTravelerDolar = Number(plan.ValorPax || 0)
      const totalPlanTravelerPesos = Number(plan.ValorPaxPesos || 0)
      const totalPlanWhitUpgradesPerTravelerPeso = totalPlanTravelerPesos + upgradesCost
      const totalPlanWhitUpgradesPerTravelerDolar = totalPlanTravelerDolar + upgradesCostInDollars

      newTravellers[travelerIndex] = {
        ...newTravellers[travelerIndex],
        upgrades: currentUpgrades,
        valorUpgradesPesos: upgradesCost.toString(),
        valorUpgradesDolar: upgradesCostInDollars.toString(),
        totalPlanTravelerPesos: totalPlanTravelerPesos.toString(),
        totalPlanTravelerDolar: totalPlanTravelerDolar.toString(),
        totalPlanWhitUpgradesPerTravelerPeso: totalPlanWhitUpgradesPerTravelerPeso.toString(),
        totalPlanWhitUpgradesPerTravelerDolar: totalPlanWhitUpgradesPerTravelerDolar.toString()
      }

      // Calcular totales
      const newTotalPesos = newTravellers
        .reduce((sum, traveler) => sum + Number(traveler.totalPlanWhitUpgradesPerTravelerPeso), 0)
        .toString()

      const newTotalDolar = newTravellers
        .reduce((sum, traveler) => sum + Number(traveler.totalPlanWhitUpgradesPerTravelerDolar), 0)
        .toString()

      setData(prevData => ({
        ...prevData,
        travelerQuotation: {
          planId: plan.IdPlan,
          totalAllTravelersPesos: newTotalPesos,
          totalAllTravelersDolar: newTotalDolar,
          travellers: newTravellers
        }
      }))
    },
    [travelerQuotation, setData, currentTraveler, productUpgrades, TRM, plan]
  )

  const currentTravellerData = travelerQuotation?.travellers[currentTraveler - 1]
  const allTravellers = travelerQuotation?.travellers

  const totalTravelersPerPlan =
    i18n.language === 'es'
      ? formatCurrency(currentTravellerData?.totalPlanTravelerPesos || '0', 'COP')
      : formatCurrency(currentTravellerData?.totalPlanTravelerDolar || '0', 'USD')

  const totalTravelerUpgrades =
    i18n.language === 'es'
      ? formatCurrency(currentTravellerData?.valorUpgradesPesos || '0', 'COP')
      : formatCurrency(currentTravellerData?.valorUpgradesDolar || '0', 'USD')

  const totalTravelerPlanWithUpgrades =
    i18n.language === 'es'
      ? formatCurrency(currentTravellerData?.totalPlanWhitUpgradesPerTravelerPeso || '0', 'COP')
      : formatCurrency(currentTravellerData?.totalPlanWhitUpgradesPerTravelerDolar || '0', 'USD')

  const totalAllTravelers =
    i18n.language === 'es'
      ? formatCurrency(travelerQuotation?.totalAllTravelersPesos || '0', 'COP')
      : formatCurrency(travelerQuotation?.totalAllTravelersDolar || '0', 'USD')

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
                currentTravellerData?.upgrades.some(u => u.id === upgrade.id_raider)
                  ? 'bg-green-100 border-green-500'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => toggleUpgrade(upgrade.id_raider, upgrade.name_raider)}
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
                  {currentTravellerData?.upgrades.some(u => u.id === upgrade.id_raider) ? (
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
              {totalTravelersPerPlan}
              {i18n.language === 'es' ? 'COP' : 'USD'}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-bold text-red-500">{t('label-upgrades')}</p>
            <p className="font-bold text-red-500">
              {totalTravelerUpgrades}
              {i18n.language === 'es' ? 'COP' : 'USD'}
            </p>
          </div>
          <div className={`flex justify-between ${numberTravellers === 1 ? 'hidden' : ''}`}>
            <p className="text-sm font-medium">{t('label-product-value-per-traveler-upgrades')}</p>
            <p className="font-bold text-red-950">
              {totalTravelerPlanWithUpgrades}
              {i18n.language === 'es' ? 'COP' : 'USD'}
            </p>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <p>{t('label-total')}</p>
            <p className="text-red-950">
              {totalAllTravelers}
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
