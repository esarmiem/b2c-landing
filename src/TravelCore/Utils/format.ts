export const formatCurrency = (value: string, currency: 'COP' | 'USD'): string => {
    const valueNumber = parseFloat(value);

    if (isNaN(valueNumber)) {
        throw new Error("El valor proporcionado no es un número válido.");
    }
    let options = {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };

    if (currency === 'COP') {
        // Para pesos colombianos, no mostramos los decimales
        options.minimumFractionDigits = 0;
        options.maximumFractionDigits = 0;
    }

    return new Intl.NumberFormat(currency === 'COP' ? 'es-CO' : 'en-US', options as Intl.NumberFormatOptions).format(valueNumber);
}