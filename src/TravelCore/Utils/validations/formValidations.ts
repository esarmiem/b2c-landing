export type ValidationPattern = 'email' | 'phone' | 'password' | 'url' | 'numbers' | 'lettersOnly'

export interface ValidationRange {
  min: number
  max: number
}

export interface ValidationRules {
  required?: boolean
  requiredAge?: boolean
  minAge?: boolean
  pattern?: ValidationPattern
  minLength?: number
  maxLength?: number
  range?: ValidationRange
  match?: string
  custom?: (value: string) => string | undefined
  isDateRange?: boolean
}

export interface FormValidationRules {
  [key: string]: ValidationRules
}

export interface ValidationResult {
  isValid: boolean
  errors: {
    [key: string]: string[]
  }
}

interface MsgForm {
  required: string
  requiredAge: string
  minAge: string
  email: string
  phone: string
  password: string
  url: string
  numbers: string
  lettersOnly: string
  minLength: (min: number) => string
  maxLength: (max: number) => string
  match: string
  range: (min: number, max: number) => string
  dateRange: {
    invalid: string
    past: string
    format: string
  }
  traveler: string
  travelers: string
}

const VALIDATION_PATTERNS: Record<ValidationPattern, RegExp> = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s-]{10,}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  numbers: /^[0-9]+$/,
  lettersOnly: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/
}

const validateDateRange = (dateRange: string): boolean => {
  if (!dateRange) return false

  const dates = dateRange.split(' - ')
  if (dates.length !== 2) return false

  return dates.every(date => {
    const [day, month, year] = date.split('/')
    if (!day || !month || !year) return false

    const parsedDate = new Date(Number(year), Number(month) - 1, Number(day))
    return (
      !Number.isNaN(parsedDate.getTime()) &&
      parsedDate.getDate() === Number(day) &&
      parsedDate.getMonth() === Number(month) - 1 &&
      parsedDate.getFullYear() === Number(year)
    )
  })
}

const isDateInPast = (dateString: string): boolean => {
  const [day, month, year] = dateString.split('/').map(Number)
  const date = new Date(year, month - 1, day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

const validateDateFormat = (dateString: string): boolean => {
  return /^\d{2}\/\d{2}\/\d{4}$/.test(dateString)
}

export const validateField = (value: string, msg: MsgForm, validations: ValidationRules = {}): string[] => {
  const errors: string[] = []

  if (validations.required && !value) {
    errors.push(msg.required)
    return errors
  }

  if (validations.requiredAge && !value) {
    errors.push(msg.requiredAge)
    return errors
  }

  if (validations.minAge && Number(value) < 18) {
    errors.push(msg.minAge)
    return errors
  }

  if (value) {
    if (validations.isDateRange) {
      const dates = value.split(' - ')
      if (dates.length !== 2) {
        errors.push(msg.dateRange.invalid)
        return errors
      }

      if (!dates.every(date => validateDateFormat(date))) {
        errors.push(msg.dateRange.format)
        return errors
      }

      if (!validateDateRange(value)) {
        errors.push(msg.dateRange.invalid)
        return errors
      }

      const [startDate] = dates
      if (isDateInPast(startDate)) {
        errors.push(msg.dateRange.past)
        return errors
      }
    }

    if (validations.minLength && value.length < validations.minLength) {
      errors.push(msg.minLength(validations.minLength))
    }

    if (validations.maxLength && value.length > validations.maxLength) {
      errors.push(msg.maxLength(validations.maxLength))
    }

    if (validations.pattern) {
      const pattern = VALIDATION_PATTERNS[validations.pattern]
      if (pattern && !pattern.test(value)) {
        errors.push(msg[validations.pattern])
      }
    }

    if (validations.pattern === 'numbers' && validations.range) {
      const num = Number(value)
      const { min, max } = validations.range
      if (num < min || num > max) {
        errors.push(msg.range(min, max))
      }
    }

    if (validations.custom) {
      const customError = validations.custom(value)
      if (customError) {
        errors.push(customError)
      }
    }

    if (validations.match && value !== validations.match) {
      errors.push(msg.match)
    }
  }

  return errors
}

export const validateForm = (formData: Record<string, string>, msg: MsgForm, validationRules: FormValidationRules): ValidationResult => {
  const errors: Record<string, string[]> = {}
  let hasErrors = false

  for (const fieldName of Object.keys(validationRules)) {
    const value = formData[fieldName]
    const fieldErrors = validateField(value, msg, validationRules[fieldName])

    if (fieldErrors.length > 0) {
      errors[fieldName] = fieldErrors
      hasErrors = true
    }

    if (fieldName === 'travelers' && validationRules[fieldName].requiredAge) {
      const ages = value.split(',')
      for (const age of ages) {
        if (age === '' || age === '0') {
          hasErrors = true
        }
      }

      // Si hay errores, recopilamos los índices de los viajeros sin edad
      if (hasErrors) {
        const travelersWithoutAge = ages.map((age, index) => (age === '' || age === '0' ? index + 1 : null)).filter(index => index !== null)

        if (travelersWithoutAge.length > 0) {
          if (!errors[fieldName]) {
            errors[fieldName] = []
          }

          // Usamos singular o plural según corresponda
          if (travelersWithoutAge.length === 1) {
            errors[fieldName].push(`${msg.requiredAge} (${msg.traveler} ${travelersWithoutAge[0]})`)
          } else {
            errors[fieldName].push(`${msg.requiredAge} (${msg.travelers} ${travelersWithoutAge.join(', ')})`)
          }
        }
      }
    }
  }

  return {
    isValid: !hasErrors,
    errors
  }
}
