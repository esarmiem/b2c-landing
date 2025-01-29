import {axiosHttp} from "../../../Utils/http.ts"
import {SERVICE_ARRIVALS} from "../../../Utils/constants.ts"
import {GET_TOKEN} from "../../../Utils/storage.ts"

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
  getArrivalDestinations: (data): Promise<ApiResponse> => {
    return axiosHttp({
      path: `${SERVICE_ARRIVALS}?isActive=${data.isActive}`,
      method: 'GET',
      session: {token: GET_TOKEN}
    })
  },
}