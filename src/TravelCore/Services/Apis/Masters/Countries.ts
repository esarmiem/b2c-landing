import {axiosHttp} from "../../../Utils/http.ts"
import {SERVICE_COUNTRIES, SERVICE_GET_CITIES_BY_COUNTRY} from "../../../Utils/constants.ts"
import {GET_TOKEN} from "../../../Utils/storage.ts"
import {CountriesData, CitiesByCountryData} from "@/TravelCore/Utils/interfaces/countries.ts";

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