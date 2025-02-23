export const createTravelers = (numberOfPassengers: number, agesString: string): { id: number; age: string }[] => {
  // const agesArray = agesString.split(';')
  const agesArray = agesString.split(',').map(age => Number.parseInt(age))
  if (agesArray.length !== numberOfPassengers) {
    throw new Error('El número de pasajeros no coincide con el número de edades proporcionadas.')
  }
  const travelers = agesArray.map((age, index) => ({
    id: index,
    age: `${age}`
  }))
  return travelers
}
