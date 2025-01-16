import { axiosHttp } from "../../../Utils/http.ts"
import { SERVICE_ARRIVALS } from "../../../Utils/constants.ts"

interface ArrivalsItems {
    idDestino: number
    descripcion: string
    codigo: number
    estaActivo: boolean
}

interface ArrivalsData {
    total: number
    page: number
    totalPages: number
    items: ArrivalsItems[],
    next: string | null
    prev: string | null
}

interface ApiResponse {
    data: ArrivalsData
    error: string | null
}

export const ARRIVALS_API = {
    getArrivalDestinations: (isActive = ""): Promise<ApiResponse> => {
        return axiosHttp({
            path: `${SERVICE_ARRIVALS}${isActive}`,
            method: 'GET',
            session: null
        })
    },
}