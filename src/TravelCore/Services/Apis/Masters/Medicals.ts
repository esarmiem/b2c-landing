import { axiosHttp } from "@/TravelCore/Utils/http.ts";
import { SERVICE_MEDICAL_CONDITIONS } from "@/TravelCore/Utils/constants.ts";
import { GET_TOKEN } from "@/TravelCore/Utils/storage.ts";
import { MedicalConditionsData } from "@/TravelCore/Utils/interfaces/Medicals.ts";

/**
 * ApiResponse
 *
 * Spanish:
 * Define la estructura de la respuesta de la API para obtener las condiciones médicas.
 * Incluye los datos de tipo MedicalConditionsData y un mensaje de error en caso de que ocurra alguno.
 *
 * English:
 * Defines the structure of the API response for fetching medical conditions.
 * It includes the data of type MedicalConditionsData and an error message if one occurs.
 */
interface ApiResponse {
  data: MedicalConditionsData;
  error: string | null;
}

/**
 * MEDICAL_CONDITIONS_API
 *
 * Spanish:
 * Objeto que encapsula la funcionalidad de la API relacionada con las condiciones médicas.
 * Proporciona el método getMedicalConditions para obtener las condiciones médicas filtradas por el estado activo.
 *
 * English:
 * Object that encapsulates the API functionality related to medical conditions.
 * It provides the getMedicalConditions method to fetch medical conditions filtered by active status.
 */
export const MEDICAL_CONDITIONS_API = {
  /**
   * getMedicalConditions
   *
   * Spanish:
   * Realiza una petición GET para obtener las condiciones médicas.
   * Se filtran los resultados utilizando el parámetro "isActive" pasado en el objeto "data".
   *
   * English:
   * Performs a GET request to retrieve medical conditions.
   * It filters the results using the "isActive" parameter provided in the "data" object.
   *
   * @param {any} data - Objeto que debe contener la propiedad "isActive" para filtrar las condiciones médicas.
   *                     / Object that should include the "isActive" property to filter medical conditions.
   * @returns {Promise<ApiResponse>} Una promesa que se resuelve con la respuesta de la API.
   *                                 / A promise that resolves with the API response.
   */
  getMedicalConditions: (data): Promise<ApiResponse> => {
    return axiosHttp({
      path: `${SERVICE_MEDICAL_CONDITIONS}?isActive=${data.isActive}`,
      method: "GET",
      session: { token: GET_TOKEN },
    });
  },
};
