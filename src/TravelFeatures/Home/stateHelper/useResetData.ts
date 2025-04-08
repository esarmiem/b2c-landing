import useData from '@/TravelCore/Hooks/useData.ts'

export const useResetData = () => {
  const { setData } = useData() || {}

  const resetData = () => {
    setData?.(prevData => ({
      ...prevData,
      travelersData: undefined,
      emergencyContactData: undefined,
      travelerQuotation: undefined,
      billingData: undefined,
      isReset: undefined
    }))
  }

  const resetResponseOrder = () => {
    setData?.(prevData => ({
      ...prevData,
      responseOrder: undefined
    }))
  }

  return { resetData, resetResponseOrder }
}
