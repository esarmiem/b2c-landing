import { axiosHttp } from "@/TravelCore/Utils/http.ts";
import { SERVICE_ARRIVALS } from "@/TravelCore/Utils/constants.ts";
import { GET_TOKEN } from "@/TravelCore/Utils/storage.ts";
import { ArrivalsData } from "@/TravelCore/Utils/interfaces/Arrivals.ts";

/**
 * ApiResponse
 *
 * Spanish:
 * Define la estructura de la respuesta de la API para los datos de llegadas, que incluye la propiedad "data" de tipo ArrivalsData
 * y un mensaje de error, si lo hubiera.
 *
 * English:
 * Defines the structure of the API response for arrival data, which includes the "data" property of type ArrivalsData
 * and an error message, if any.
 */
interface ApiResponse {
  data: ArrivalsData;
  error: string | null;
}

/**
 * ARRIVALS_API
 *
 * Spanish:
 * Objeto que encapsula la funcionalidad de la API para obtener destinos de llegadas.
 * Proporciona el método getArrivalDestinations que realiza una petición GET utilizando un token de sesión.
 *
 * English:
 * Object that encapsulates the API functionality for fetching arrival destinations.
 * It provides the getArrivalDestinations method which performs a GET request using a session token.
 */
export const ARRIVALS_API = {
  /**
   * getArrivalDestinations
   *
   * Spanish:
   * Realiza una petición GET para obtener los destinos de llegadas basándose en el parámetro "isActive".
   * Se espera que el objeto "data" contenga la propiedad "isActive" que se utiliza para filtrar los resultados.
   *
   * English:
   * Performs a GET request to fetch arrival destinations based on the "isActive" parameter.
   * The "data" object is expected to contain the "isActive" property, which is used to filter the results.
   *
   * @param {any} data - Objeto que contiene los parámetros necesarios para la consulta, incluyendo "isActive".
   *                     / Object containing the necessary parameters for the request, including "isActive".
   * @returns {Promise<ApiResponse>} Una promesa que se resuelve con la respuesta de la API.
   *                                 / A promise that resolves with the API response.
   */
  getArrivalDestinations: (data: any): Promise<ApiResponse> => {
    return axiosHttp({
      path: `${SERVICE_ARRIVALS}?isActive=${data.isActive}`,
      method: "GET",
      session: { token: GET_TOKEN },
    });
  },
};
