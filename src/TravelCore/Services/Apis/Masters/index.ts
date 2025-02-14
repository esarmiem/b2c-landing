import {ARRIVALS_API} from "./Arrivals.ts"
import {COUNTRIES_API} from "./Countries.ts"
import {DOCUMENT_TYPE_API} from "./Documents.ts"
import {QUESTIONS_API} from "./Questions.ts"
import {MEDICAL_CONDITIONS_API} from "./Medicals.ts"
import {PRODUCTS_API} from "./Products.ts"
import {PARAMETERS_API} from "./Parameters.ts";

export class MastersServices {
    static documentTypeApi = DOCUMENT_TYPE_API;
    static arrivalsApi = ARRIVALS_API;
    static countriesApi = COUNTRIES_API;
    static questionsApi = QUESTIONS_API;
    static medicalConditionsApi = MEDICAL_CONDITIONS_API;
    static productsApi = PRODUCTS_API;
    static parametersApi = PARAMETERS_API;
}