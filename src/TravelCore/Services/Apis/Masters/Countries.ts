import {axiosHttp} from "../../../Utils/http.ts"
import {SERVICE_COUNTRIES, SERVICE_GET_CITIES_BY_COUNTRY} from "../../../Utils/constants.ts"
import {GET_TOKEN} from "../../../Utils/storage.ts"

interface CountriesItems {
  idPais: number
  descripcion: string
  estaActivo: boolean
  codigoISO: string
  indicativo: string | null
  comInternActivo: boolean
}

interface CountriesData {
  total: number
  page: number
  totalPages: number
  items: CountriesItems[]
  next: string | null
  previous: string | null
}

interface CitiesByCountryData {
  idCiudad: number
  descripcion: string
  codigo: string
  estaActivo: boolean
  idPais: number
}

interface countriesResponse {
  data: CountriesData
  error: string | null
}

interface citiesByCountryResponse {
  data: CitiesByCountryData[]
  error: string | null
}

export const COUNTRIES_API = {
  getCountries: (data): Promise<countriesResponse> => {
    return axiosHttp({
      path: `${SERVICE_COUNTRIES}?isActive=${data.isActive}`,
      method: 'GET',
      session: {token: GET_TOKEN}
    })
  },
  getCitiesByCountry: (data): Promise<citiesByCountryResponse> => {
    return axiosHttp({
      path: `${SERVICE_GET_CITIES_BY_COUNTRY}?isActive=${data.isActive}`,
      method: 'GET',
      session: {token: GET_TOKEN}
    })
  }
}