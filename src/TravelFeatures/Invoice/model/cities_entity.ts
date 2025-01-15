import {CITIES_API} from '../../../TravelCore/Services/Apis/Cities'

export class Cities{
    async getCitiesByCountry(country: number): Promise<any> {
        return await CITIES_API.getCitiesByCountry({country})
    }
}
