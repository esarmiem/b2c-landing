import {ORDER_API} from '../../../TravelCore/Services/Apis/Masters/Order'

export class Order{
    async checkPreOrder(data: any): Promise<any> {
        return await ORDER_API.checkPreorderISL(data)
    }

    /*async addOrder(data: any): Promise<any> {
        return await ORDER_API.addOrder({data})
    }*/
}
