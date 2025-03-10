export const formatCurrency = (value: string, currency: 'COP' | 'USD'): string => {
  const valueNumber = Number.parseFloat(value)

  if (Number.isNaN(valueNumber)) {
    throw new Error('El valor proporcionado no es un número válido.')
  }
  const options = {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }

  if (currency === 'COP') {
    // Para pesos colombianos, no mostramos los decimales
    options.minimumFractionDigits = 0
    options.maximumFractionDigits = 0
  }

  if (currency === 'USD') {
    // Para dólares, mostramos el signo de dólar antes del valor
    options.minimumFractionDigits = 2
  }

  return new Intl.NumberFormat(currency === 'COP' ? 'es-CO' : 'en-US', options as Intl.NumberFormatOptions).format(valueNumber)
}
