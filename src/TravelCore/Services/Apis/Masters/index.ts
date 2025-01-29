import {ARRIVALS_API} from "./Arrivals.ts"
import {AUTH_API} from "./Authentication.ts"
import {COUNTRIES_API} from "./Countries.ts"
import {DOCUMENT_TYPE_API} from "./Documents.ts"
import {GET_ORDER_PRICE_EDAD} from "./Order.ts"
import {QUESTIONS_API} from "./Questions.ts"
import {MEDICAL_CONDITIONS_API} from "./Medicals.ts"
import {PRODUCTS_API} from "./Products.ts"
import {PARAMETERS_API} from "./Parameters.ts";

export class MastersServices {
    static documentTypeApi = DOCUMENT_TYPE_API;
    static arrivalsApi = ARRIVALS_API;
    static orderPriceEdad = GET_ORDER_PRICE_EDAD;
    static countriesApi = COUNTRIES_API;
    static authApi = AUTH_API;
    static questionsApi = QUESTIONS_API;
    static medicalConditionsApi = MEDICAL_CONDITIONS_API;
    static productsApi = PRODUCTS_API;
    static parametersApi = PARAMETERS_API;
}