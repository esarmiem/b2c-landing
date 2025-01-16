import { axiosHttp } from "../../../Utils/http.ts"
import { SERVICE_DOCUMENT_TYPE } from "../../../Utils/constants.ts"

interface DocumentTypeItems {
    idTipoDocumento: number
    abreviacion: string
    nombre: string
    estaActivo: boolean
}

interface DocumentTypeData {
    total: number
    page: number
    totalPages: number
    items: DocumentTypeItems[]
    next: string | null
    prev: string | null
}

interface ApiResponse {
    data: DocumentTypeData
    error: string | null
}

export const DOCUMENT_TYPE_API = {
    getDocumentTypes: (isActive = ""): Promise<ApiResponse> => {
        return axiosHttp({
            path: `${SERVICE_DOCUMENT_TYPE}${isActive}`,
            method: 'GET',
            session: null
        })
    },
}