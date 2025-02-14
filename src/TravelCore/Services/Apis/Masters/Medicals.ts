import {axiosHttp} from "@/TravelCore/Utils/http.ts"
import {SERVICE_MEDICAL_CONDITIONS} from "@/TravelCore/Utils/constants.ts"
import {GET_TOKEN} from "@/TravelCore/Utils/storage.ts"
import {MedicalConditionsData} from "@/TravelCore/Utils/interfaces/Medicals.ts";

interface ApiResponse {
  data: MedicalConditionsData
  error: string | null
}

export const MEDICAL_CONDITIONS_API = {
  getMedicalConditions: (data): Promise<ApiResponse> => {
    return axiosHttp({
      path: `${SERVICE_MEDICAL_CONDITIONS}?isActive=${data.isActive}`,
      method: 'GET',
      session: {token: GET_TOKEN}
    })
  },
}