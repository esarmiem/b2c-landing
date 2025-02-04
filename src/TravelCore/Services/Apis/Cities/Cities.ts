import {axiosHttp} from "@/TravelCore/Utils/http.ts";
import {SERVICE_GET_CITIES_BY_COUNTRY} from "@/TravelCore/Utils/constants.ts";
import {GET_TOKEN} from "@/TravelCore/Utils/storage.ts";

export const CITIES_API = {
    getCitiesByCountry: (data: any): Promise<any> => {
        return axiosHttp({
            path: `${SERVICE_GET_CITIES_BY_COUNTRY}?isActive=${data.isActive}`,
            method: 'GET',
            session: {token: GET_TOKEN}
        })
    }
}