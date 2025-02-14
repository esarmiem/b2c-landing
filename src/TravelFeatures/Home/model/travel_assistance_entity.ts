import {ASSISTANCE_API} from '@/TravelCore/Services/Apis/Order'
import {dataOrder, ResponseData} from "@/TravelCore/Utils/interfaces/Order.ts";

export class TravelAssistance{
    async getOrderPriceByAge(data: dataOrder): Promise<ResponseData> {
        const response = await ASSISTANCE_API.getOrderPriceEdad(data);
        return response as unknown as ResponseData;
    }
}