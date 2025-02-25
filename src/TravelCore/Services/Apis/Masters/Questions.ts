import { axiosHttp } from "@/TravelCore/Utils/http.ts";
import { SERVICE_QUESTIONS } from "@/TravelCore/Utils/constants.ts";
import { GET_TOKEN } from "@/TravelCore/Utils/storage.ts";
import { QuestionData } from "@/TravelCore/Utils/interfaces/Questions.ts";

/**
 * ApiResponse
 *
 * Spanish:
 * Define la estructura de la respuesta de la API para obtener preguntas.
 * Contiene los datos de tipo QuestionData y un mensaje de error, en caso de que ocurra alguno.
 *
 * English:
 * Defines the structure of the API response for fetching questions.
 * It includes data of type QuestionData and an error message, if any.
 */
interface ApiResponse {
  data: QuestionData;
  error: string | null;
}

/**
 * FilterData
 *
 * Spanish:
 * Define la estructura del objeto `data` que se pasa a la función `getQuestions`.
 * Contiene la propiedad `isActive` para filtrar los resultados.
 *
 * English:
 * Defines the structure of the `data` object passed to the `getQuestions` function.
 * It contains the `isActive` property to filter results.
 */
interface FilterData {
  isActive: boolean;
}

/**
 * QUESTIONS_API
 *
 * Spanish:
 * Objeto que encapsula la funcionalidad de la API relacionada con las preguntas.
 * Proporciona el método getQuestions para obtener las preguntas filtradas por el estado activo.
 *
 * English:
 * Object that encapsulates the API functionality related to questions.
 * It provides the getQuestions method to fetch questions filtered by active status.
 */
export const QUESTIONS_API = {
  /**
   * getQuestions
   *
   * Spanish:
   * Realiza una petición GET para obtener preguntas.
   * Se filtran las preguntas utilizando el parámetro "isActive" proporcionado en el objeto "data".
   *
   * English:
   * Performs a GET request to retrieve questions.
   * Questions are filtered using the "isActive" parameter provided in the "data" object.
   *
   * @param {FilterData} data - Objeto que debe incluir la propiedad "isActive" para filtrar las preguntas.
   *                            / Object that should include the "isActive" property to filter questions.
   * @returns {Promise<ApiResponse>} Una promesa que se resuelve con la respuesta de la API.
   *                                 / A promise that resolves with the API response.
   */
  getQuestions: (data: FilterData): Promise<ApiResponse> => {
    return axiosHttp({
      path: `${SERVICE_QUESTIONS}?isActive=${data.isActive}`,
      method: "GET",
      session: { token: GET_TOKEN },
    });
  },
};