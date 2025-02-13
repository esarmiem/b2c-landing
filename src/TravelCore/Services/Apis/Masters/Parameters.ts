import {axiosHttp} from "@/TravelCore/Utils/http.ts"
import {SERVICE_PARAMETERS} from "@/TravelCore/Utils/constants.ts"
import {GET_TOKEN} from "@/TravelCore/Utils/storage.ts"
import {ParametersData} from "@/TravelCore/Utils/interfaces/Parameters.ts";

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