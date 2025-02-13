import {axiosHttp} from "@/TravelCore/Utils/http.ts"
import {SERVICE_QUESTIONS} from "@/TravelCore/Utils/constants.ts"
import {GET_TOKEN} from "@/TravelCore/Utils/storage.ts"
import {QuestionData} from "@/TravelCore/Utils/interfaces/Questions.ts";

interface ApiResponse {
  data: QuestionData
  error: string | null
}

export const QUESTIONS_API = {
  getQuestions: (data): Promise<ApiResponse> => {
    return axiosHttp({
      path: `${SERVICE_QUESTIONS}?isActive=${data.isActive}`,
      method: 'GET',
      session: {token: GET_TOKEN}
    })
  },
}