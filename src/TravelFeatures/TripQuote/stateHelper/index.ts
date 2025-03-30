import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { formatCurrency } from '@/TravelCore/Utils/format'
import type { DescriptionDescuentos, Plan, Quotation, TravellerQuotation } from '@/TravelCore/Utils/interfaces/Order'
import useData from '@/TravelCore/Hooks/useData'
import useManagementUpgrades from './useManagementUpgrades'

export const index = (isOpen: boolean, plan: Plan) => {
  const { i18n } = useTranslation()
  const { data, setData } = useData() || {}
  const travelerQuotation = data?.travelerQuotation
  const numberTravellers = data?.payloadOrder?.cantidadPax || 1

  const payloadOrder = data?.payloadOrder || {}

  const [currentTraveler, setCurrentTraveler] = useState(1)
  const { productUpgrades, isLoading, trm: TRM } = useManagementUpgrades(plan.IdPlan, isOpen)

  // Crear un identificador único para la consulta actual
  const createQueryId = useCallback(() => {
    const { salida, llegada, pais, destino, cantidadPax } = payloadOrder
    return `${plan.IdPlan}-${cantidadPax || 1}-${salida || ''}-${llegada || ''}-${pais || ''}-${destino || ''}`
  }, [plan.IdPlan, payloadOrder])

  // Inicialización de la cotización - solo cuando es necesario
  useEffect(() => {
    const currentQueryId = createQueryId()

    const shouldInitialize =
      !travelerQuotation ||
      travelerQuotation.planId !== plan.IdPlan ||
      travelerQuotation.travellers.length !== numberTravellers ||
      travelerQuotation.queryId !== currentQueryId

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

      const initialDescriptionDescuentosDollars: DescriptionDescuentos | undefined = plan.DescripcionDescuentosDolares
        ? {
            porcentaje: plan.DescripcionDescuentosDolares.porcentaje,
            valorDescuento: plan.DescripcionDescuentosDolares.valorDescuento,
            valorTotal: plan.DescripcionDescuentosDolares.valorTotal
          }
        : undefined

      const initialDescriptionDescuentosPesos: DescriptionDescuentos | undefined = plan.DescripcionDescuentosPesos
        ? {
            porcentaje: plan.DescripcionDescuentosPesos.porcentaje,
            valorDescuento: plan.DescripcionDescuentosPesos.valorDescuento,
            valorTotal: plan.DescripcionDescuentosPesos.valorTotal
          }
        : undefined

      const initialQuotation: Quotation = {
        planId: plan.IdPlan,
        queryId: currentQueryId,
        totalAllTravelersPesos: plan.ValorPesos || '0',
        totalAllTravelersDolar: plan.Valor || '0',
        travellers: initialTravellers,
        descriptionDescuentosDolares: initialDescriptionDescuentosDollars,
        descriptionDescuentosPesos: initialDescriptionDescuentosPesos
      }

      setData(prevData => ({
        ...prevData,
        travelerQuotation: initialQuotation
      }))
    }
  }, [
    travelerQuotation,
    numberTravellers,
    plan.IdPlan,
    plan.ValorPesos,
    plan.Valor,
    setData,
    createQueryId,
    payloadOrder.salida,
    payloadOrder.llegada,
    payloadOrder.pais,
    payloadOrder.destino,
    plan.ValorPaxPesos,
    plan.ValorPax,
    plan.DescripcionDescuentosDolares,
    plan.DescripcionDescuentosPesos
  ])

  const toggleUpgrade = useCallback(
    (id_raider: string, name_raider: string) => {
      if (!travelerQuotation || !setData) return

      const newTravellers = [...travelerQuotation.travellers]
      const travelerIndex = currentTraveler - 1
      const upgrade = productUpgrades?.find((u: { id_raider: string; cost_raider?: string }) => u.id_raider === id_raider)

      if (!upgrade) return

      const currentUpgrades = [...newTravellers[travelerIndex].upgrades]
      const existingUpgradeIndex = currentUpgrades.findIndex((u: { id: string }) => u.id === id_raider)

      if (existingUpgradeIndex === -1) {
        currentUpgrades.push({ id: id_raider, name: name_raider })
      } else {
        currentUpgrades.splice(existingUpgradeIndex, 1)
      }

      // Corregir cálculos
      const upgradesCost = currentUpgrades.reduce((total, upgrade) => {
        const foundUpgrade = productUpgrades?.find((u: { id_raider: string }) => u.id_raider === upgrade.id)
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
          queryId: travelerQuotation.queryId,
          totalAllTravelersPesos: newTotalPesos,
          totalAllTravelersDolar: newTotalDolar,
          travellers: newTravellers,
          descriptionDescuentosDolares: travelerQuotation.descriptionDescuentosDolares,
          descriptionDescuentosPesos: travelerQuotation.descriptionDescuentosPesos
        }
      }))
    },
    [travelerQuotation, setData, currentTraveler, productUpgrades, TRM, plan]
  )

  const currentTravellerData = travelerQuotation?.travellers[currentTraveler - 1]
  const allTravellers = travelerQuotation?.travellers

  const hasUpgrades = productUpgrades && productUpgrades.length > 0

  // Formateo de valores monetarios
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

  return {
    isLoading,
    productUpgrades,
    hasUpgrades,
    numberTravellers,
    currentTraveler,
    setCurrentTraveler,
    currentTravellerData,
    allTravellers,
    toggleUpgrade,
    totalTravelersPerPlan,
    totalTravelerUpgrades,
    totalTravelerPlanWithUpgrades,
    totalAllTravelers,
    i18n
  }
}
