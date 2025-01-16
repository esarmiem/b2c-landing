import {B2CPARAMETERS_API} from '../../../TravelCore/Services/Apis/B2CParameters'

export class Parameters{
    async getParameters(lang: string): Promise<any> {
        const response: any = await B2CPARAMETERS_API.getB2CParameters({lang})
        return response.filter((item:any) => item.idioma === lang)
    }
}
