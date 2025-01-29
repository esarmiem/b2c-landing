import {axiosHttp} from "../../../Utils/http.ts"
import {SERVICE_PARAMETERS} from "../../../Utils/constants.ts"
import {GET_TOKEN} from "../../../Utils/storage.ts"

interface Padre {
  idParametro: number
  idioma: string
  texto: string
  link: string
  archivoUrl: string
  descripcion: string
  agrupacion: string
  titulo: boolean
  estado: boolean
  pagina: string
  idPadre: number | null
}

interface ParametersData {
  idParametro: number
  idioma: string
  texto: string
  link: string
  archivoUrl: string
  descripcion: string
  agrupacion: string
  titulo: boolean
  estado: boolean
  pagina: string
  idPadre: number | null
  padre: Padre | null
}

interface ApiResponse {
  data: ParametersData[]
  error: string | null
}

export const PARAMETERS_API = {
  getParameters: (data): Promise<ApiResponse> => {
    return axiosHttp({
      path: `${SERVICE_PARAMETERS}?isActive=${data.isActive}`,
      method: 'GET',
      session: {token: GET_TOKEN}
    })
  },
}