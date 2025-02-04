import {axiosHttp} from "../../../Utils/http.ts"
import {SERVICE_QUESTIONS} from "../../../Utils/constants.ts"
import {GET_TOKEN} from "../../../Utils/storage.ts"

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
  getQuestions: (data: any): Promise<ApiResponse> => {
    return axiosHttp({
      path: `${SERVICE_QUESTIONS}?isActive=${data.isActive}`,
      method: 'GET',
      session: {token: GET_TOKEN}
    })
  },
}