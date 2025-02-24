import { validateForm } from '@/TravelCore/Utils/validations/formValidations.ts'
import { useMessageTranslations } from '@/TravelCore/Utils/validations/useMessageTranslations.ts'
import type { MouseEvent } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DateSelector } from './DateSelector'
import { DestinationSelector } from './DestinationSelector'
import { TravelButtonForm } from './TravelButtonForm'
import { TravelersPopover } from './TravelersPopover'

interface SearchFormContentProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

export function SearchFormContent({ onClick }: SearchFormContentProps) {
  const { t } = useTranslation(['home'])
  const msg = useMessageTranslations()
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    destination: '',
    travelDate: '',
    travelers: ''
  })
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({})

  const validationRules = {
    destination: { required: true },
    travelDate: {
      required: true,
      isDateRange: true
    },
    travelers: { requiredAge: true }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    const validationResult = validateForm({ [field]: value }, msg, { [field]: validationRules[field as keyof typeof validationRules] })
    setErrors(prev => ({
      ...prev,
      [field]: validationResult.errors[field] || []
    }))
  }

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const validationResult = validateForm(formData, msg, validationRules)

    if (!validationResult.isValid) {
      setErrors(validationResult.errors)
      return
    }
    onClick(event)
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
