import { useUtilsValidations } from '@/TravelCore/Utils/validations/useUtilsValidations.ts'
import type { MouseEvent } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DateSelector } from './DateSelector'
import { DestinationSelector } from './DestinationSelector'
import { TravelButtonForm } from './TravelButtonForm'
import { TravelersPopover } from './TravelersPopover'
import useHomeState from '@/TravelFeatures/Home/stateHelper'
import { LoadingScreen } from '@/TravelCore/Components/Epic/LoadingScreen.tsx'

export function SearchFormContent() {
  const { t } = useTranslation(['home'])
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)
  const { isLoadingOrders, handleGetQuote } = useHomeState()

  const validationRules = {
    destination: { required: true },
    travelDate: {
      required: true,
      isDateRange: true,
      minDateRange: 3
    },
    travelers: { requiredAge: true }
  }

  const { errors, handleChangeValidate, validateFormData } = useUtilsValidations(validationRules)
  const handleChange = (field: string, value: string) => {
    handleChangeValidate(field, value)
  }

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!validateFormData()) {
      return
    }
    handleGetQuote()
  }

  if (isLoadingOrders) {
    return <LoadingScreen message={t('label-title-loader')} subMessage={t('label-text-loader')} />
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-red-700 rounded-lg lg:rounded-full shadow-xl p-4 -mt-7">
      <DestinationSelector
        activeTooltip={activeTooltip}
        setActiveTooltip={setActiveTooltip}
        t={t}
        onChange={value => handleChange('destination', value)}
        errors={errors.destination}
      />

      <DateSelector
        activeTooltip={activeTooltip}
        setActiveTooltip={setActiveTooltip}
        t={t}
        onChange={value => handleChange('travelDate', value)}
        errors={errors.travelDate}
      />

      <TravelersPopover onChange={value => handleChange('travelers', value)} errors={errors.travelers} />

      <TravelButtonForm onClick={handleSubmit} />
    </div>
  )
}
