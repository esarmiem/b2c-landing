import {axiosHttp} from "@/TravelCore/Utils/http.ts"
import {SERVICE_DOCUMENT_TYPE} from "@/TravelCore/Utils/constants.ts"
import {GET_TOKEN} from "@/TravelCore/Utils/storage.ts"
import {DocumentTypeData} from "@/TravelCore/Utils/interfaces/Document.ts";

interface ApiResponse {
  data: DocumentTypeData
  error: string | null
}

export const DOCUMENT_TYPE_API = {
  getDocumentTypes: (data): Promise<ApiResponse> => {
    return axiosHttp({
      path: `${SERVICE_DOCUMENT_TYPE}?isActive=${data.isActive}`,
      method: 'GET',
      session: {token: GET_TOKEN}
    })
  },
}