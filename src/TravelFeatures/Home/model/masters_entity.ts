import {COUNTRIES_API} from '../../../TravelCore/Services/Apis/Countries'
import {ARRIVALS_API} from '../../../TravelCore/Services/Apis/Arrivals'
import {QUESTIONS_API} from '../../../TravelCore/Services/Apis/Questions'
import {MEDICAL_CONDITIONS_API} from '../../../TravelCore/Services/Apis/MedicalConditions'
import {DOCUMENT_TYPE_API} from '../../../TravelCore/Services/Apis/DocumentType'
import {PRODUCTS_API} from '../../../TravelCore/Services/Apis/Products'

export class Masters{

    async getCountries(): Promise<any> {
        return await COUNTRIES_API.getCountries("true")
    }

    async getArrivalDestinations(): Promise<any> {
        return await ARRIVALS_API.getArrivalDestinations("true")
    }

    async getQuestions(): Promise<any> {
        return await QUESTIONS_API.getQuestions("true")
    }

    async getMedicalConditions(): Promise<any> {
        return await MEDICAL_CONDITIONS_API.getMedicalConditions("true")
    }

    async getDocumentTypes(): Promise<any> {
        return await DOCUMENT_TYPE_API.getDocumentTypes("true")
    }

    async getProducts(): Promise<any> {
        return await PRODUCTS_API.getProducts("true")
    }
}
