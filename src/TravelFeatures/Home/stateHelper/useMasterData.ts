import useMasters from '@/TravelCore/Hooks/useMasters.ts'
import type { StateKey } from '@/TravelCore/Utils/interfaces/context.ts'
import { Masters } from '@/TravelFeatures/Home/model/masters_entity.ts'

export const useMasterData = () => {
  const masterContext = useMasters()

  const loadMasters = async () => {
    const masters = new Masters()
    const masterDataMap = {
      countries: masters.getCountries,
      arrivals: masters.getArrivalDestinations,
      questions: masters.getQuestions,
      medicals: masters.getMedicalConditions,
      documents: masters.getDocumentTypes,
      products: masters.getProducts,
      parameters: masters.getParameters
    }

    const loadDataPromises = Object.entries(masterDataMap).map(async ([key, fetchFn]) => {
      const typedKey = key as StateKey

      try {
        if (masterContext && !masterContext[typedKey]?.data) {
          const response = await fetchFn()
          if (response?.data) {
            masterContext[typedKey].setData(response.data)
          }
        }
      } catch (error) {
        console.error(`Failed to load master data for ${key}:`, error)
      }
    })

    return Promise.all(loadDataPromises)
  }

  const reloadMasters = async () => {
    const masters = new Masters()
    const masterDataMap = {
      countries: masters.getCountries,
      arrivals: masters.getArrivalDestinations,
      questions: masters.getQuestions,
      medicals: masters.getMedicalConditions,
      documents: masters.getDocumentTypes,
      products: masters.getProducts,
      parameters: masters.getParameters
    }

    const loadDataPromises = Object.entries(masterDataMap).map(async ([key, fetchFn]) => {
      const typedKey = key as StateKey

      try {
        if (masterContext) {
          const response = await fetchFn()
          if (response?.data) {
            masterContext[typedKey].setData(response.data)
          }
        }
      } catch (error) {
        console.error(`Failed to load master data for ${key}:`, error)
      }
    })

    return Promise.all(loadDataPromises)
  }

  return { loadMasters, reloadMasters }
}
