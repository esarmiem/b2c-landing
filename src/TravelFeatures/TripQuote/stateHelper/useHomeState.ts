import { useCallback, useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { formatCurrency } from '@/TravelCore/Utils/format'
import type { DescriptionDescuentos, Plan, Quotation, TravellerQuotation, Upgrade } from '@/TravelCore/Utils/interfaces/Order'
import useData from '@/TravelCore/Hooks/useData'
import useManagementUpgrades from './useManagementUpgrades'

interface QuotationManagerResult {
  // isLoading: boolean
  // productUpgrades: Upgrade[]
  // hasUpgrades: boolean
  numberTravellers: number
  currentTraveler: number
  setCurrentTraveler: (traveler: number) => void
  // currentTravellerData: TravellerQuotation | undefined
  allTravellers: TravellerQuotation[] | undefined
  // toggleUpgrade: (id_raider: string, name_raider: string) => void
  totalTravelersPerPlan: string
  // totalTravelerUpgrades: string
  // totalTravelerPlanWithUpgrades: string
  totalAllTravelers: string
}

export const useHomeState = (isOpen: boolean, plan: Plan): QuotationManagerResult => {
  const { i18n } = useTranslation()
  const { data, setData } = useData() || {}
  const travelerQuotation = data?.travelerQuotation
  const payloadOrder = data?.payloadOrder || {}
  const numberTravellers = payloadOrder?.cantidadPax || 1
  const planId = data?.selectedPlan

  const [currentTraveler, setCurrentTraveler] = useState<number>(1)
  // const { productUpgrades, isLoading, trm: TRM } = useManagementUpgrades(planId, isOpen)

  // Crear un identificador único para la consulta actual
  const currentQueryId = useMemo(() => {
    const { salida, llegada, pais, destino, cantidadPax } = payloadOrder
    return `${plan.IdPlan}-${cantidadPax || 1}-${salida || ''}-${llegada || ''}-${pais || ''}-${destino || ''}`
  }, [plan.IdPlan, payloadOrder])

  // Función para crear la cotización inicial
  const createInitialQuotation = useCallback((): Quotation => {
    const planValuePesos = plan.ValorPaxPesos || '0'
    const planValueDollar = plan.ValorPax || '0'

    const initialTravellers: TravellerQuotation[] = Array.from({ length: numberTravellers }, (_, index) => ({
      id: index + 1,
      totalPlanTravelerPesos: planValuePesos,
      totalPlanTravelerDolar: planValueDollar,
      totalPlanWhitUpgradesPerTravelerPeso: planValuePesos,
      totalPlanWhitUpgradesPerTravelerDolar: planValueDollar,
      valorUpgradesPesos: '0',
      valorUpgradesDolar: '0',
      upgrades: []
    }))

    // Usar directamente las propiedades de plan para los descuentos
    const initialDescriptionDescuentosDollars: DescriptionDescuentos | undefined = plan.DescripcionDescuentosDolares
      ? { ...plan.DescripcionDescuentosDolares }
      : undefined

    const initialDescriptionDescuentosPesos: DescriptionDescuentos | undefined = plan.DescripcionDescuentosPesos
      ? { ...plan.DescripcionDescuentosPesos }
      : undefined

    return {
      planId: plan.IdPlan,
      queryId: currentQueryId,
      totalAllTravelersPesos: plan.ValorPesos || '0',
      totalAllTravelersDolar: plan.Valor || '0',
      travellers: initialTravellers,
      descriptionDescuentosDolares: initialDescriptionDescuentosDollars,
      descriptionDescuentosPesos: initialDescriptionDescuentosPesos
    }
  }, [
    plan.IdPlan,
    plan.ValorPaxPesos,
    plan.ValorPax,
    plan.ValorPesos,
    plan.Valor,
    plan.DescripcionDescuentosDolares,
    plan.DescripcionDescuentosPesos,
    numberTravellers,
    currentQueryId
  ])

  // Inicialización de la cotización - solo cuando es necesario
  useEffect(() => {
    if (!isOpen || !setData) return

    const shouldInitialize =
      !travelerQuotation ||
      travelerQuotation.planId !== plan.IdPlan ||
      travelerQuotation.travellers.length !== numberTravellers ||
      travelerQuotation.queryId !== currentQueryId

    if (shouldInitialize) {
      const initialQuotation = createInitialQuotation()

      setData(prevData => ({
        ...prevData,
        travelerQuotation: initialQuotation
      }))
    }
  }, [isOpen, travelerQuotation, plan.IdPlan, numberTravellers, currentQueryId, setData, createInitialQuotation])

  // Función para calcular costos de upgrades
  // const calculateUpgradeCosts = useCallback(
  //   (upgrades: TravellerQuotation['upgrades']) => {
  //     const upgradesCostPesos = upgrades.reduce((total, upgrade) => {
  //       const foundUpgrade = productUpgrades?.find(u => u.id_raider === upgrade.id)
  //       // Limpiar el valor de cost_raider para asegurar que sea un número
  //       const costString = foundUpgrade?.cost_raider || '0'
  //       const cost = Number.parseFloat(costString.replace(/[.,]/g, ''))
  //       return total + cost
  //     }, 0)
  //
  //     const upgradesCostDollars = TRM ? Number((upgradesCostPesos / TRM).toFixed(2)) : 0
  //
  //     return {
  //       pesos: upgradesCostPesos,
  //       dollars: upgradesCostDollars
  //     }
  //   },
  //   [productUpgrades, TRM]
  // )

  // const toggleUpgrade = useCallback(
  //   (id_raider: string, name_raider: string) => {
  //     if (!travelerQuotation || !setData) return
  //
  //     const newTravellers = [...travelerQuotation.travellers]
  //     const travelerIndex = currentTraveler - 1
  //
  //     if (travelerIndex < 0 || travelerIndex >= newTravellers.length) return
  //
  //     const traveler = newTravellers[travelerIndex]
  //     const currentUpgrades = [...traveler.upgrades]
  //
  //     // Agregar o quitar el upgrade
  //     const existingUpgradeIndex = currentUpgrades.findIndex(u => u.id === id_raider)
  //
  //     if (existingUpgradeIndex === -1) {
  //       currentUpgrades.push({ id: id_raider, name: name_raider })
  //     } else {
  //       currentUpgrades.splice(existingUpgradeIndex, 1)
  //     }
  //
  //     // Calcular costos
  //     const upgradeCosts = calculateUpgradeCosts(currentUpgrades)
  //
  //     // Valores del plan base
  //     const basePlanPesos = Number.parseFloat(traveler.totalPlanTravelerPesos)
  //     const basePlanDollars = Number.parseFloat(traveler.totalPlanTravelerDolar)
  //
  //     // Calcular totales con upgrades
  //     const totalWithUpgradesPesos = basePlanPesos + upgradeCosts.pesos
  //     const totalWithUpgradesDollars = basePlanDollars + upgradeCosts.dollars
  //
  //     // Actualizar viajero actual
  //     newTravellers[travelerIndex] = {
  //       ...traveler,
  //       upgrades: currentUpgrades,
  //       valorUpgradesPesos: upgradeCosts.pesos.toString(),
  //       valorUpgradesDolar: upgradeCosts.dollars.toString(),
  //       totalPlanWhitUpgradesPerTravelerPeso: totalWithUpgradesPesos.toString(),
  //       totalPlanWhitUpgradesPerTravelerDolar: totalWithUpgradesDollars.toString()
  //     }
  //
  //     // Calcular totales generales
  //     const newTotalPesos = newTravellers
  //       .reduce((sum, traveler) => sum + Number.parseFloat(traveler.totalPlanWhitUpgradesPerTravelerPeso), 0)
  //       .toString()
  //
  //     const newTotalDolar = newTravellers
  //       .reduce((sum, traveler) => sum + Number.parseFloat(traveler.totalPlanWhitUpgradesPerTravelerDolar), 0)
  //       .toString()
  //
  //     // Actualizar datos
  //     setData(prevData => ({
  //       ...prevData,
  //       travelerQuotation: {
  //         ...travelerQuotation,
  //         totalAllTravelersPesos: newTotalPesos,
  //         totalAllTravelersDolar: newTotalDolar,
  //         travellers: newTravellers
  //       }
  //     }))
  //   },
  //   [travelerQuotation, setData, currentTraveler, calculateUpgradeCosts]
  // )

  const currentTravellerData = useMemo(() => {
    if (!travelerQuotation?.travellers || travelerQuotation.travellers.length === 0) return undefined
    const index = currentTraveler - 1
    return index >= 0 && index < travelerQuotation.travellers.length ? travelerQuotation.travellers[index] : undefined
  }, [travelerQuotation, currentTraveler])

  const allTravellers = travelerQuotation?.travellers
  // const hasUpgrades = Boolean(productUpgrades?.length)

  // Función para formatear valores según el idioma
  const formatValue = useCallback((value: string | undefined, currency: 'COP' | 'USD'): string => {
    return formatCurrency(value || '0', currency)
  }, [])

  // Valores formateados para la interfaz
  const formattedValues = useMemo(() => {
    const isSpanish = i18n.language.startsWith('es')
    const currency = isSpanish ? 'COP' : 'USD'

    return {
      totalTravelersPerPlan: formatValue(
        isSpanish ? currentTravellerData?.totalPlanTravelerPesos : currentTravellerData?.totalPlanTravelerDolar,
        currency
      ),
      totalTravelerUpgrades: formatValue(
        isSpanish ? currentTravellerData?.valorUpgradesPesos : currentTravellerData?.valorUpgradesDolar,
        currency
      ),
      totalTravelerPlanWithUpgrades: formatValue(
        isSpanish
          ? currentTravellerData?.totalPlanWhitUpgradesPerTravelerPeso
          : currentTravellerData?.totalPlanWhitUpgradesPerTravelerDolar,
        currency
      ),
      totalAllTravelers: formatValue(
        isSpanish ? travelerQuotation?.totalAllTravelersPesos : travelerQuotation?.totalAllTravelersDolar,
        currency
      )
    }
  }, [currentTravellerData, travelerQuotation, i18n.language, formatValue])

  return {
    // isLoading,
    // productUpgrades,
    // hasUpgrades,
    numberTravellers,
    currentTraveler,
    setCurrentTraveler,
    // currentTravellerData,
    allTravellers,
    // toggleUpgrade,
    totalTravelersPerPlan: formattedValues.totalTravelersPerPlan,
    // totalTravelerUpgrades: formattedValues.totalTravelerUpgrades,
    // totalTravelerPlanWithUpgrades: formattedValues.totalTravelerPlanWithUpgrades,
    totalAllTravelers: formattedValues.totalAllTravelers
  }
}
