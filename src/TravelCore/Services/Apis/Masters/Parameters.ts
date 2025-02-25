import { axiosHttp } from "@/TravelCore/Utils/http.ts";
import { SERVICE_PARAMETERS } from "@/TravelCore/Utils/constants.ts";
import { GET_TOKEN } from "@/TravelCore/Utils/storage.ts";
import { ParametersData } from "@/TravelCore/Utils/interfaces/Parameters.ts";

/**
 * ApiResponse
 *
 * Spanish:
 * Define la estructura de la respuesta de la API para obtener parámetros.
 * Contiene un arreglo de datos de parámetros y un mensaje de error (si lo hay).
 *
 * English:
 * Defines the structure of the API response for fetching parameters.
 * It includes an array of parameter data and an error message, if any.
 */
interface ApiResponse {
  data: ParametersData[];
  error: string | null;
}

/**
 * FilterData
 *
 * Spanish:
 * Define la estructura del objeto `data` que se pasa a la función `getParameters`.
 * Contiene la propiedad `isActive` para filtrar los resultados.
 *
 * English:
 * Defines the structure of the `data` object passed to the `getParameters` function.
 * It contains the `isActive` property to filter results.
 */
interface FilterData {
  isActive: boolean;
}

/**
 * PARAMETERS_API
 *
 * Spanish:
 * Objeto que encapsula la funcionalidad de la API relacionada con parámetros.
 * Proporciona el método getParameters para obtener los parámetros filtrados por el estado activo.
 *
 * English:
 * Object that encapsulates the API functionality related to parameters.
 * It provides the getParameters method to fetch parameters filtered by active status.
 */
export const PARAMETERS_API = {
  /**
   * getParameters
   *
   * Spanish:
   * Realiza una petición GET para obtener una lista de parámetros.
   * Utiliza el parámetro "isActive" del objeto data para filtrar los resultados.
   *
   * English:
   * Performs a GET request to retrieve a list of parameters.
   * It uses the "isActive" property from the data object to filter the results.
   *
   * @param {FilterData} data - Objeto que debe incluir la propiedad "isActive" para filtrar los parámetros.
   *                            / Object that should include the "isActive" property to filter parameters.
   * @returns {Promise<ApiResponse>} Una promesa que se resuelve con la respuesta de la API.
   *                                 / A promise that resolves with the API response.
   */
  getParameters: (data: FilterData): Promise<ApiResponse> => {
    return axiosHttp({
      path: `${SERVICE_PARAMETERS}?isActive=${data.isActive}`,
      method: "GET",
      session: { token: GET_TOKEN },
    });
  },
};