import { useState, useCallback } from 'react'
import type { Plan, Quotation, Upgrade } from '@/TravelCore/Utils/interfaces/Order'

export const useTravelerQuotation = (initialQuotation?: Quotation) => {
  const [quotation, setQuotation] = useState<Quotation | undefined>(initialQuotation)

  const calculateUpgradesCost = useCallback((upgrades: { id: string; name: string }[], productUpgrades: Upgrade[], trm: number, plan: Plan) => {
    const upgradesCost = upgrades.reduce((total, upgrade) => {
      const foundUpgrade = productUpgrades?.find(u => u.id_raider === upgrade.id)
      const cost = foundUpgrade?.cost_raider.replace(/[.,]/g, '') || '0'
      return total + Number.parseInt(cost, 10)
    }, 0)

    const upgradesCostInDollars = Number((upgradesCost / trm).toFixed(2))
    const totalPlanTravelerDolar = Number(plan.ValorPax || 0)
    const totalPlanTravelerPesos = Number(plan.ValorPaxPesos || 0)
    const totalPlanWhitUpgradesPerTravelerPeso = totalPlanTravelerPesos + upgradesCost
    const totalPlanWhitUpgradesPerTravelerDolar = totalPlanTravelerDolar + upgradesCostInDollars

    return {
      upgradesCost,
      upgradesCostInDollars,
      totalPlanTravelerPesos,
      totalPlanTravelerDolar,
      totalPlanWhitUpgradesPerTravelerPeso,
      totalPlanWhitUpgradesPerTravelerDolar
    }
  }, [])

  const toggleTravelerUpgrade = useCallback((
    currentTraveler: number,
    upgrades: { id: string; name: string }[],
    productUpgrades: Upgrade[],
    trm: number,
    plan: Plan
  ) => {
    if (!quotation) return undefined

    const newTravellers = [...quotation.travellers]
    const travelerIndex = currentTraveler - 1

    const calculatedValues = calculateUpgradesCost(upgrades, productUpgrades, trm, plan)

    newTravellers[travelerIndex] = {
      ...newTravellers[travelerIndex],
      upgrades,
      valorUpgradesPesos: calculatedValues.upgradesCost.toString(),
      valorUpgradesDolar: calculatedValues.upgradesCostInDollars.toString(),
      totalPlanTravelerPesos: calculatedValues.totalPlanTravelerPesos.toString(),
      totalPlanTravelerDolar: calculatedValues.totalPlanTravelerDolar.toString(),
      totalPlanWhitUpgradesPerTravelerPeso: calculatedValues.totalPlanWhitUpgradesPerTravelerPeso.toString(),
      totalPlanWhitUpgradesPerTravelerDolar: calculatedValues.totalPlanWhitUpgradesPerTravelerDolar.toString()
    }

    const newTotalPesos = newTravellers
      .reduce((sum, traveler) => sum + Number(traveler.totalPlanWhitUpgradesPerTravelerPeso), 0)
      .toString()

    const newTotalDolar = newTravellers
      .reduce((sum, traveler) => sum + Number(traveler.totalPlanWhitUpgradesPerTravelerDolar), 0)
      .toString()

    const updatedQuotation = {
      ...quotation,
      travellers: newTravellers,
      totalAllTravelersPesos: newTotalPesos,
      totalAllTravelersDolar: newTotalDolar
    }

    setQuotation(updatedQuotation)

    return updatedQuotation
  }, [quotation, calculateUpgradesCost])

  return {
    quotation,
    setQuotation,
    toggleTravelerUpgrade
  }
}