import {axiosHttp} from "@/TravelCore/Utils/http.ts";
import {SERVICE_CHECK_PREORDER_ISL} from "@/TravelCore/Utils/constants.ts";
import {GET_TOKEN} from "@/TravelCore/Utils/storage.ts";

export const ASSISTANCE_API = {
    getOrderPriceByAge: (data: any): Promise<any> => {
        return axiosHttp({
            path: `${SERVICE_CHECK_PREORDER_ISL}`,
            method: 'POST',
            data: JSON.stringify(data),
            session: {token: GET_TOKEN}
        })
    }
}