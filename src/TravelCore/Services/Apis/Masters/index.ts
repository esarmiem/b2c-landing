import { ARRIVALS_API } from "./Arrivals.ts";
import { COUNTRIES_API } from "./Countries.ts";
import { DOCUMENT_TYPE_API } from "./Documents.ts";
import { QUESTIONS_API } from "./Questions.ts";
import { MEDICAL_CONDITIONS_API } from "./Medicals.ts";
import { PRODUCTS_API } from "./Products.ts";
import { PARAMETERS_API } from "./Parameters.ts";

/**
 * MastersServices
 *
 * Spanish:
 * Clase que centraliza y agrupa todos los servicios maestros disponibles en la aplicación.
 * Cada propiedad estática representa un API específico utilizado para obtener información relacionada con
 * llegadas, países, tipos de documentos, preguntas, condiciones médicas, productos y parámetros.
 *
 * English:
 * Class that centralizes and groups all master services available in the application.
 * Each static property represents a specific API used to fetch information related to arrivals,
 * countries, document types, questions, medical conditions, products, and parameters.
 */
export class MastersServices {
  static documentTypeApi = DOCUMENT_TYPE_API;
  static arrivalsApi = ARRIVALS_API;
  static countriesApi = COUNTRIES_API;
  static questionsApi = QUESTIONS_API;
  static medicalConditionsApi = MEDICAL_CONDITIONS_API;
  static productsApi = PRODUCTS_API;
  static parametersApi = PARAMETERS_API;
}
