import {axiosHttp} from "../../../Utils/http.ts"
import {SERVICE_ARRIVALS} from "../../../Utils/constants.ts"
import {GET_TOKEN} from "../../../Utils/storage.ts"
import {ArrivalsData} from "@/TravelCore/Utils/interfaces/Arrivals.ts";

interface ApiResponse {
  data: ArrivalsData
  error: string | null
}

export const ARRIVALS_API = {
  getArrivalDestinations: (data: any): Promise<ApiResponse> => {
    return axiosHttp({
      path: `${SERVICE_ARRIVALS}?isActive=${data.isActive}`,
      method: 'GET',
      session: {token: GET_TOKEN}
    })
  },
}