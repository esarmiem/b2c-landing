import {COUNTRIES_API} from '../../../TravelCore/Services/Apis/Cities'
import {ARRIVALS_API} from '../../../TravelCore/Services/Apis/Arrivals'
import {QUESTIONS_API} from '../../../TravelCore/Services/Apis/Questions'
import {MEDICAL_CONDITIONS_API} from '../../../TravelCore/Services/Apis/MedicalConditions'
import {DOCUMENT_TYPE_API} from '../../../TravelCore/Services/Apis/DocumentType'
import {PRODUCTS_API} from '../../../TravelCore/Services/Apis/Products'

export class Masters{

    async getCountries(): Promise<any> {
        return await COUNTRIES_API.getCountries({active: true})
    }

    async getArrivalDestinations(): Promise<any> {
        return await ARRIVALS_API.getArrivalDestinations({active: true})
    }

    async getQuestions(): Promise<any> {
        return await QUESTIONS_API.getQuestions({active: true})
    }

    async getMedicalConditions(): Promise<any> {
        return await MEDICAL_CONDITIONS_API.getMedicalConditions({active: true})
    }

    async getDocumentTypes(): Promise<any> {
        return await DOCUMENT_TYPE_API.getDocumentTypes({active: true})
    }

    async getProducts(): Promise<any> {
        return await PRODUCTS_API.getProducts({active: true})
    }
}
