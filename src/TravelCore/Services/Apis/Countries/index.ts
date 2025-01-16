import { axiosHttp } from "../../../Utils/http.ts"
import { SERVICE_COUNTRIES } from "../../../Utils/constants.ts"

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

interface ApiResponse {
    data: CountriesData
    error: string | null
}

export const COUNTRIES_API = {
    getCountries: (isActive = ""): Promise<ApiResponse> => {
        return axiosHttp({
            path: `${SERVICE_COUNTRIES}${isActive}`,
            method: 'GET',
            session: null
        })
    },
}