import {axiosHttp} from "@/TravelCore/Utils/http.ts"
import {SERVICE_PRODUCTS} from "@/TravelCore/Utils/constants.ts"
import {GET_TOKEN} from "@/TravelCore/Utils/storage.ts"
import {ProductsData} from "@/TravelCore/Utils/interfaces/Products.ts";

interface ApiResponse {
  data: ProductsData
  error: string | null
}

export const PRODUCTS_API = {
  getProducts: (data): Promise<ApiResponse> => {
    return axiosHttp({
      path: `${SERVICE_PRODUCTS}?isActive=${data.isActive}`,
      method: 'GET',
      session: {token: GET_TOKEN}
    })
  },
}