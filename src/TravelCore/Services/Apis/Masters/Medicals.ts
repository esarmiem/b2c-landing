import {axiosHttp} from "../../../Utils/http.ts"
import {SERVICE_MEDICAL_CONDITIONS} from "../../../Utils/constants.ts"
import {GET_TOKEN} from "../../../Utils/storage.ts"

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
  getMedicalConditions: (data: any): Promise<ApiResponse> => {
    return axiosHttp({
      path: `${SERVICE_MEDICAL_CONDITIONS}?isActive=${data.isActive}`,
      method: 'GET',
      session: {token: GET_TOKEN}
    })
  },
}