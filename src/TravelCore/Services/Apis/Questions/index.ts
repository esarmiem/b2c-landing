import { axiosHttp } from "../../../Utils/http.ts"
import { SERVICE_QUESTIONS } from "../../../Utils/constants.ts"

interface QuestionItems {
    idPregunta: number
    descripcion: string
    estaActivo: boolean
    tipoViaje: string
}

interface QuestionData {
    total: number
    page: number
    totalPages: number
    items: QuestionItems[]
    next: string | null
    prev: string | null
}

interface ApiResponse {
    data: QuestionData
    error: string | null
}

export const QUESTIONS_API = {
    getQuestions: (isActive = ""): Promise<ApiResponse> => {
        return axiosHttp({
            path: `${SERVICE_QUESTIONS}${isActive}`,
            method: 'GET',
            session: null
        })
    },
}