export interface CountriesItems {
  idPais: number
  descripcion: string
  estaActivo: boolean
  codigoISO: string
  indicativo: string | null
  comInternActivo: boolean
}

export interface CountriesData {
  total: number
  page: number
  totalPages: number
  items: CountriesItems[]
  next: string | null
  previous: string | null
}

export interface CitiesByCountryData {
  idCiudad: number
  descripcion: string
  codigo: string
  estaActivo: boolean
  idPais: number
}