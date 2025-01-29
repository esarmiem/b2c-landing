import {MastersServices} from "../../../TravelCore/Services/Apis/Masters"

export class Masters{

    async getParameters(): Promise<any> {
        return await MastersServices.parametersApi.getParameters({isActive: true})
    }

    async getCountries(): Promise<any> {
        return await MastersServices.countriesApi.getCountries({isActive: true})
    }

    async getArrivalDestinations(): Promise<any> {
        return await MastersServices.arrivalsApi.getArrivalDestinations({isActive: true})
    }

    async getQuestions(): Promise<any> {
        return await MastersServices.questionsApi.getQuestions({isActive: true})
    }

    async getMedicalConditions(): Promise<any> {
        return await MastersServices.medicalConditionsApi.getMedicalConditions({isActive: true})
    }

    async getDocumentTypes(): Promise<any> {
        return await MastersServices.documentTypeApi.getDocumentTypes({isActive: true})
    }

    async getProducts(): Promise<any> {
        return await MastersServices.productsApi.getProducts({isActive: true})
    }
}
