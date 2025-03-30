import { useState, useEffect } from 'react'
import { getProductUpdates } from '@/TravelCore/Services/Apis/Order'
import { useTRMToday } from '@/TravelCore/Hooks/useTRMToday'
import type { Upgrade } from '@/TravelCore/Utils/interfaces/Order'
import i18n from 'i18next'

const useManagementUpgrades = (planId: number, isOpen: boolean) => {
  const [productUpgrades, setProductUpgrades] = useState<Upgrade[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [trm, setTrm] = useState(0)
  const { fetchTRM } = useTRMToday()

  const currentLanguage = i18n?.language === 'es' ? 'spa' : i18n?.language === 'en' ? 'eng' : ''

  useEffect(() => {
    if (!isOpen) return

    const loadData = async () => {
      setIsLoading(true)
      try {
        if (trm === 0) {
          const trmData = await fetchTRM()
          setTrm(trmData)
        }

        const upgrades = await getProductUpdates({
          id_plan: planId.toString(),
          language: currentLanguage
        })
        setProductUpgrades(upgrades)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error desconocido'))
        setProductUpgrades([])
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [isOpen, planId, currentLanguage, trm])

  return {
    productUpgrades,
    isLoading,
    error,
    trm
  }
}

export default useManagementUpgrades
