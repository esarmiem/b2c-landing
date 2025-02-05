import {MastersServices} from '@/TravelCore/Services/Apis/Masters'

export class Parameters{
    async getParameters(lang: string): Promise<any> {
        const response: any = await MastersServices.parametersApi.getParameters({isActive: true})
        return response.filter((item:any) => item.idioma === lang)
    }
}