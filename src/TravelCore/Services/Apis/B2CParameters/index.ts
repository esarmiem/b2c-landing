import { axiosHttp } from "../../../Utils/http.ts"
import { SERVICE_B2CPARAMETERS } from "../../../Utils/constants.ts"

interface Padre {
    "idParametro": number
    "idioma": string
    "texto": string
    "link": string
    "archivoUrl": string
    "descripcion": string
    "agrupacion": string
    "titulo": boolean
    "estado": boolean
    "pagina": string
    "idPadre": number | null
}

interface B2cParametersData {
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
    data: B2cParametersData[]
    error: string | null
}

export const B2CPARAMETERS_API = {
    getB2CParameters: (isActive = ""): Promise<ApiResponse> => {
        return axiosHttp({
            path: `${SERVICE_B2CPARAMETERS}${isActive}`,
            method: 'GET',
            session: null
        })
    },
}