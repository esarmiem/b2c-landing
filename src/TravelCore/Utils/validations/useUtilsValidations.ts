import { useTranslation } from 'react-i18next'
import { validateForm, type FormValidationRules } from '@/TravelCore/Utils/validations/formValidations.ts'
import { useState } from 'react'

interface formDataType {
  [key: string]: string
}

export const useUtilsValidations = (validationRules: FormValidationRules) => {
  const { t } = useTranslation(['home'])
  const [formData, setFormData] = useState<formDataType>({})
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({})

  const msg = {
    required: t('validation.required'),
    requiredAge: t('validation.requiredAge'),
    minAge: t('validation.minAge'),
    email: t('validation.email'),
    phone: t('validation.phone'),
    password: t('validation.password'),
    url: t('validation.url'),
    numbers: t('validation.numbers'),
    lettersOnly: t('validation.lettersOnly'),
    minLength: (min: number): string => `${t('validation.minLength')} ${min} ${t('validation.characters')}`,
    maxLength: (max: number): string => `${t('validation.maxLength')} ${max} ${t('validation.characters')}`,
    match: t('validation.match'),
    range: (min: number, max: number): string => `${t('validation.range')} ${min} ${t('validation.and')} ${max}`,
    dateRange: {
      invalid: t('validation.dateRange.invalid'),
      past: t('validation.dateRange.past'),
      format: t('validation.dateRange.format')
    },
    traveler: t('validation.traveler'),
    travelers: t('validation.travelers')
  }

  const handleChangeValidate = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    const validationResult = validateForm({ [field]: value }, msg, { [field]: validationRules[field] })
    setErrors(prev => ({
      ...prev,
      [field]: validationResult.errors[field] || []
    }))
  }

  const validateFormData = (): boolean => {
    const validationResult = validateForm(formData, msg, validationRules)
    setErrors(validationResult.errors)
    return validationResult.isValid
  }

  return { msg, errors, formData, setFormData, setErrors, handleChangeValidate, validateFormData }
}
