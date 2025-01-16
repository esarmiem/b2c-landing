import { axiosHttp } from "../../../Utils/http.ts"
import { SERVICE_MEDICAL_CONDITIONS } from "../../../Utils/constants.ts"

interface MedicalConditionsItems {
    idCondicionMedica: number
    descripcion: string
    estaActivo: boolean
}

interface MedicalConditionsData {
    total: number
    page: number
    totalPages: number
    items: MedicalConditionsItems[]
    next: string | null,
    prev: string | null
}

interface ApiResponse {
    data: MedicalConditionsData
    error: string | null
}

export const MEDICAL_CONDITIONS_API = {
    getMedicalConditions: (isActive = ""): Promise<ApiResponse> => {
        return axiosHttp({
            path: `${SERVICE_MEDICAL_CONDITIONS}${isActive}`,
            method: 'GET',
            session: null
        })
    },
}