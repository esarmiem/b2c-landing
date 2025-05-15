import useData from '@/TravelCore/Hooks/useData.ts'
import useMasters from '@/TravelCore/Hooks/useMasters.ts'

export const useResetData = () => {
  const { setData } = useData() || {}
  const { products, arrivals, documents, medicals, parameters, questions, cities, countries } = useMasters() || {}

  const resetData = () => {
    setData?.(prevData => ({
      ...prevData,
      travelersData: undefined,
      emergencyContactData: undefined,
      travelerQuotation: undefined,
      billingData: undefined,
      isReset: undefined,
    }))
  }

  const resetMasterData = () => {
    products?.setData(undefined as any)
    arrivals?.setData(undefined as any)
    documents?.setData(undefined as any)
    medicals?.setData(undefined as any)
    parameters?.setData(undefined as any)
    questions?.setData(undefined as any)
    cities?.setData(undefined as any)
    countries?.setData(undefined as any)
  }

  const resetResponseOrder = () => {
    setData?.(prevData => ({
      ...prevData,
      responseOrder: undefined
    }))
  }

  return { resetData, resetResponseOrder, resetMasterData }
}