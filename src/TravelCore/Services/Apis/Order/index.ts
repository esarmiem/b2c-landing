import {axiosHttp} from "../../../Utils/http.ts"
import {SERVICE_CHECK_PREORDER_ISL, SERVICE_GET_ORDER_PRICE_EDAD, ISL_APP_SERVICE_UPGRADES} from "../../../Utils/constants.ts"
import {GET_TOKEN} from "../../../Utils/storage.ts"
import {dataOrder, dataPreorder, ResponseData, CheckPreorderISLResponse} from "@/TravelCore/Utils/interfaces/Order.ts";
import {AUTH_ISL_API} from "@/TravelCore/Services/Apis/AuthenticationISL";

interface ApiResponse {
  data: ResponseData;
  error: string | null;
}

interface ApiCheckPreOrderResponse {
  data: CheckPreorderISLResponse;
  error: string | null;
}

interface PayloadUpgrades {
  id_plan : string
  language : string
}

export const getProductUpdates = async (payload: PayloadUpgrades) => {

  const authISL = await AUTH_ISL_API.loginISL();
  console.log("authISL: ", authISL);
  const queryParams = new URLSearchParams({
    request: 'get_upgrade',
    token: authISL?.data?.result?.token,
    id_plan: payload.id_plan.toString(),
    language: payload.language,
  }).toString();

  const url = `${ISL_APP_SERVICE_UPGRADES}?${queryParams}`;
  console.log("url: ", url);

  try {
    const response = await axiosHttp({
      method: 'GET',
      pathISL: url,
      customConfig: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching product updates:', error);
    throw error;
  }
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
  checkPreorderISL: (data: dataPreorder): Promise<ApiCheckPreOrderResponse> => {
    return axiosHttp({
      path: `${SERVICE_CHECK_PREORDER_ISL}`,
      method: 'POST',
      data: JSON.stringify(data),
      session: {token: GET_TOKEN}
    })
  }
}