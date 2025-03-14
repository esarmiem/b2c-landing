import { MastersServices } from '@/TravelCore/Services/Apis/Masters'
/**
 * Masters
 *
 * Spanish:
 * Clase que centraliza las operaciones para obtener datos maestros de la aplicación.
 * Cada método asíncrono se encarga de llamar al servicio correspondiente del objeto MastersServices,
 * solicitando datos que están filtrados por el estado activo (isActive: true).
 *
 * English:
 * Class that centralizes operations to fetch master data for the application.
 * Each asynchronous method is responsible for calling the corresponding service method from the MastersServices object,
 * fetching data that is filtered by active status (isActive: true).
 */
export class Masters {
  /**
   * getParameters
   *
   * Spanish:
   * Método asíncrono que obtiene los parámetros activos.
   *
   * English:
   * Asynchronous method that fetches active parameters.
   *
   * @returns {Promise<any>} Una promesa que se resuelve con la respuesta de la API de parámetros.
   *                         / A promise that resolves with the parameters API response.
   */
  async getParameters(): Promise<any> {
    return await MastersServices.parametersApi.getParameters({
      isActive: true
    })
  }
  /**
   * getCountries
   *
   * Spanish:
   * Método asíncrono que obtiene la lista de países activos.
   *
   * English:
   * Asynchronous method that fetches the list of active countries.
   *
   * @returns {Promise<any>} Una promesa que se resuelve con la respuesta de la API de países.
   *                         / A promise that resolves with the countries API response.
   */
  async getCountries(): Promise<any> {
    console.log('session token', sessionStorage.getItem('token'))
    return await MastersServices.countriesApi.getCountries({ isActive: true })
  }
  /**
   * getArrivalDestinations
   *
   * Spanish:
   * Método asíncrono que obtiene los destinos de llegadas activos.
   *
   * English:
   * Asynchronous method that fetches active arrival destinations.
   *
   * @returns {Promise<any>} Una promesa que se resuelve con la respuesta de la API de llegadas.
   *                         / A promise that resolves with the arrivals API response.
   */
  async getArrivalDestinations(): Promise<any> {
    return await MastersServices.arrivalsApi.getArrivalDestinations({
      isActive: true
    })
  }
  /**
   * getQuestions
   *
   * Spanish:
   * Método asíncrono que obtiene las preguntas activas.
   *
   * English:
   * Asynchronous method that fetches active questions.
   *
   * @returns {Promise<any>} Una promesa que se resuelve con la respuesta de la API de preguntas.
   *                         / A promise that resolves with the questions API response.
   */
  async getQuestions(): Promise<any> {
    return await MastersServices.questionsApi.getQuestions({ isActive: true })
  }
  /**
   * getMedicalConditions
   *
   * Spanish:
   * Método asíncrono que obtiene las condiciones médicas activas.
   *
   * English:
   * Asynchronous method that fetches active medical conditions.
   *
   * @returns {Promise<any>} Una promesa que se resuelve con la respuesta de la API de condiciones médicas.
   *                         / A promise that resolves with the medical conditions API response.
   */
  async getMedicalConditions(): Promise<any> {
    return await MastersServices.medicalConditionsApi.getMedicalConditions({
      isActive: true
    })
  }
  /**
   * getDocumentTypes
   *
   * Spanish:
   * Método asíncrono que obtiene los tipos de documento activos.
   *
   * English:
   * Asynchronous method that fetches active document types.
   *
   * @returns {Promise<any>} Una promesa que se resuelve con la respuesta de la API de tipos de documento.
   *                         / A promise that resolves with the document types API response.
   */
  async getDocumentTypes(): Promise<any> {
    return await MastersServices.documentTypeApi.getDocumentTypes({
      isActive: true
    })
  }
  /**
   * getProducts
   *
   * Spanish:
   * Método asíncrono que obtiene la lista de productos activos.
   *
   * English:
   * Asynchronous method that fetches active products.
   *
   * @returns {Promise<any>} Una promesa que se resuelve con la respuesta de la API de productos.
   *                         / A promise that resolves with the products API response.
   */
  async getProducts(): Promise<any> {
    return await MastersServices.productsApi.getProducts({ isActive: true })
  }
}
