import {axiosHttp} from "../../../Utils/http.ts"
import {SERVICE_CHECK_PREORDER_ISL, SERVICE_GET_ORDER_PRICE_EDAD,} from "../../../Utils/constants.ts"
import {GET_TOKEN, GET_TOKEN_ISL} from "../../../Utils/storage.ts"
import {dataOrder, dataPreorder, ResponseData, CheckPreorderISLResponse} from "@/TravelCore/Utils/interfaces/Order.ts";

interface ApiResponse {
  data: ResponseData;
  error: string | null;
}

interface ApiCheckPreOrderResponse {
  data: CheckPreorderISLResponse;
  error: string | null;
}

export const ASSISTANCE_API = {
  getOrderPriceEdad: (data: dataOrder): Promise<ApiResponse> => {
    return axiosHttp({
      path: `${SERVICE_GET_ORDER_PRICE_EDAD}`,
      method: 'POST',
      data: JSON.stringify(data),
      session: {token: GET_TOKEN}
    })
  },
  // getProductUpdates: async (productCode: string) => {
  //   const url = `${ISL_APP_SERVICE_UPGRADES_PRODUCTION}`;
  //   const token = await getISLToken();
  //   const data = {
  //     request: 'get_upgrade',
  //     token: token,
  //     id_plan: productCode,
  //     language: 'spa',
  //   };
  //
  //   try {
  //     const response = await axiosHttp({
  //       method: 'GET',
  //       path: url,
  //       data: JSON.stringify(data),
  //       customConfig: {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching product updates:', error);
  //     throw error;
  //   }
  // },
  checkPreorderISL: (data: dataPreorder): Promise<ApiCheckPreOrderResponse> => {
    return axiosHttp({
      path: `${SERVICE_CHECK_PREORDER_ISL}`,
      method: 'POST',
      data: JSON.stringify(data),
      session: {token: GET_TOKEN}
    })
  }
}