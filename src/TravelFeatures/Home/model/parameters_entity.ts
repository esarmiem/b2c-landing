import {PARAMETERS_API} from '../../../TravelCore/Services/Apis/Masters/Parameters'

export class Parameters{
    async getParameters(lang: string): Promise<any> {
        const response: any = await PARAMETERS_API.getParameters({lang})
        return response.filter((item:any) => item.idioma === lang)
    }
}
