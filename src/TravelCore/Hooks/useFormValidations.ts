import { type ValidationRules, validateField } from '@/TravelCore/Utils/formValidations'
import { useState } from 'react'

interface FormValidationRules {
  [key: string]: ValidationRules
}

export const useFormValidations = (initialValues: Record<string, string>, rules: FormValidationRules) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<Record<string, string | null>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (rules[name]) {
      const validation = validateField(value, rules[name])
      if (!validation.isValid) {
        setErrors(prev => ({ ...prev, [name]: validation.error }))
        return
      }
    }

    setValues(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: null }))
  }

  const isValid = () => {
    let formIsValid = true
    const newErrors: Record<string, string | null> = {}

    for (const fieldName of Object.keys(rules)) {
      const validation = validateField(values[fieldName], rules[fieldName])
      if (!validation.isValid) {
        formIsValid = false
        newErrors[fieldName] = validation.error
      }
    }

    setErrors(newErrors)
    return formIsValid
  }

  return { values, errors, handleChange, isValid }
}
