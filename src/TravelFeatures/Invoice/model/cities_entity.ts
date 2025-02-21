import { CITIES_API } from "../../../TravelCore/Services/Apis/Cities";
/**
 * Cities
 *
 * Spanish:
 * Clase que encapsula las operaciones para obtener ciudades por país utilizando el servicio CITIES_API.
 *
 * English:
 * Class that encapsulates operations to fetch cities by country using the CITIES_API service.
 */
export class Cities {
  /**
   * getCitiesByCountry
   *
   * Spanish:
   * Método asíncrono que obtiene la lista de ciudades de un país específico. Realiza una solicitud a la API
   * pasando el identificador del país como parámetro.
   *
   * English:
   * Asynchronous method that retrieves the list of cities for a specific country. It makes an API request
   * by passing the country identifier as a parameter.
   *
   * @param {number} country - El identificador del país para el cual se quieren obtener las ciudades.
   *                           / The identifier of the country for which to fetch the cities.
   * @returns {Promise<any>} Una promesa que se resuelve con los datos de las ciudades.
   *                         / A promise that resolves with the cities data.
   */
  async getCitiesByCountry(country: number): Promise<any> {
    return await CITIES_API.getCitiesByCountry({ country });
  }
}
