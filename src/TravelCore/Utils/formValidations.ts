export type ValidationPattern = 'email' | 'phone' | 'password' | 'url' | 'numbers' | 'lettersOnly'

export interface ValidationRange {
  min: number
  max: number
}

export interface ValidationRules {
  required?: boolean
  requiredAge?: boolean
  pattern?: ValidationPattern
  minLength?: number
  maxLength?: number
  range?: ValidationRange
  match?: string
  custom?: (value: any) => string | undefined
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

const VALIDATION_PATTERNS: Record<ValidationPattern, RegExp> = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s-]{10,}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  numbers: /^[0-9]+$/,
  lettersOnly: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/
}

const VALIDATION_MESSAGES = {
  required: 'Este campo es requerido',
  requiredAge: 'La edad es requerida',
  email: 'Ingrese un email válido',
  phone: 'Ingrese un número de teléfono válido',
  password: 'La contraseña debe tener al menos 8 caracteres, una letra y un número',
  url: 'Ingrese una URL válida',
  numbers: 'Este campo solo acepta números del 0 al 9',
  lettersOnly: 'Este campo solo acepta letras',
  minLength: (min: number): string => `Debe tener al menos ${min} caracteres`,
  maxLength: (max: number): string => `Debe tener máximo ${max} caracteres`,
  match: 'Los campos no coinciden',
  range: (min: number, max: number): string => `El número debe estar entre ${min} y ${max}`,
  dateRange: {
    invalid: 'Seleccione un rango de fechas válido',
    past: 'La fecha de inicio no puede ser anterior a hoy',
    format: 'El formato de fecha debe ser DD/MM/YYYY'
  }
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

export const validateField = (value: any, validations: ValidationRules = {}): string[] => {
  const errors: string[] = []

  // Validación de campo requerido
  if (validations.required && !value) {
    errors.push(VALIDATION_MESSAGES.required)
    return errors
  }

  // Validación de edad requerida
  if (validations.requiredAge && !value) {
    errors.push(VALIDATION_MESSAGES.requiredAge)
    return errors
  }

  // Si el valor está presente, procedemos con las validaciones
  if (value) {
    // Validación especial para rangos de fecha
    if (validations.isDateRange) {
      // Validar el formato de la fecha
      const dates = value.split(' - ')
      if (dates.length !== 2) {
        errors.push(VALIDATION_MESSAGES.dateRange.invalid)
        return errors
      }

      // Validar el formato de cada fecha
      if (!dates.every(date => validateDateFormat(date))) {
        errors.push(VALIDATION_MESSAGES.dateRange.format)
        return errors
      }

      // Validar que las fechas sean válidas
      if (!validateDateRange(value)) {
        errors.push(VALIDATION_MESSAGES.dateRange.invalid)
        return errors
      }

      // Validar que la fecha inicial no sea en el pasado
      const [startDate] = dates
      if (isDateInPast(startDate)) {
        errors.push(VALIDATION_MESSAGES.dateRange.past)
        return errors
      }
    }

    // Validación de longitud mínima
    if (validations.minLength && value.length < validations.minLength) {
      errors.push(VALIDATION_MESSAGES.minLength(validations.minLength))
    }

    // Validación de longitud máxima
    if (validations.maxLength && value.length > validations.maxLength) {
      errors.push(VALIDATION_MESSAGES.maxLength(validations.maxLength))
    }

    // Validación de patrón
    if (validations.pattern) {
      const pattern = VALIDATION_PATTERNS[validations.pattern]
      if (pattern && !pattern.test(value)) {
        errors.push(VALIDATION_MESSAGES[validations.pattern])
      }
    }

    // Validación de rango numérico
    if (validations.pattern === 'numbers' && validations.range) {
      const num = Number(value)
      const { min, max } = validations.range
      if (num < min || num > max) {
        errors.push(VALIDATION_MESSAGES.range(min, max))
      }
    }

    // Validación personalizada
    if (validations.custom) {
      const customError = validations.custom(value)
      if (customError) {
        errors.push(customError)
      }
    }

    // Validación de coincidencia
    if (validations.match && value !== validations.match) {
      errors.push(VALIDATION_MESSAGES.match)
    }
  }

  return errors
}

export const validateForm = (formData: Record<string, any>, validationRules: FormValidationRules): ValidationResult => {
  const errors: Record<string, string[]> = {}
  let hasErrors = false

  // Validar cada campo del formulario
  for (const fieldName of Object.keys(validationRules)) {
    const value = formData[fieldName]
    const fieldErrors = validateField(value, validationRules[fieldName])

    if (fieldErrors.length > 0) {
      errors[fieldName] = fieldErrors
      hasErrors = true
    }
  }

  return {
    isValid: !hasErrors,
    errors
  }
}

// Helper function para validación en tiempo real
export const validateSingleField = (fieldName: string, value: any, validationRules: ValidationRules): string[] => {
  return validateField(value, validationRules)
}
