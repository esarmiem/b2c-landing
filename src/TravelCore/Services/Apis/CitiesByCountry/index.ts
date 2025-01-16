import { axiosHttp } from "../../../Utils/http.ts"
import { SERVICE_GET_CITIES_BY_COUNTRY } from "../../../Utils/constants.ts"

interface CitiesByCountryData {
    idCiudad: number
    descripcion: string
    codigo: string
    estaActivo: boolean
    idPais: number
}

interface ApiResponse {
    data: CitiesByCountryData[]
    error: string | null
}

export const COUNTRIES_API = {
    getCountries: (isActive = ""): Promise<ApiResponse> => {
        return axiosHttp({
            path: `${SERVICE_GET_CITIES_BY_COUNTRY}${isActive}`,
            method: 'GET',
            session: null
        })
    },
}