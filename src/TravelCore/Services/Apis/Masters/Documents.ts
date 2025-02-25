import { axiosHttp } from "@/TravelCore/Utils/http.ts";
import { SERVICE_DOCUMENT_TYPE } from "@/TravelCore/Utils/constants.ts";
import { GET_TOKEN } from "@/TravelCore/Utils/storage.ts";
import { DocumentTypeData } from "@/TravelCore/Utils/interfaces/Document.ts";

/**
 * ApiResponse
 *
 * Spanish:
 * Define la estructura de la respuesta de la API para obtener tipos de documento.
 * Contiene los datos de tipo DocumentTypeData y un mensaje de error, en caso de haberlo.
 *
 * English:
 * Defines the structure of the API response for fetching document types.
 * It contains the data of type DocumentTypeData and an error message, if any.
 */
interface ApiResponse {
  data: DocumentTypeData;
  error: string | null;
}

/**
 * FilterData
 *
 * Spanish:
 * Define la estructura del objeto `data` que se pasa a la función `getDocumentTypes`.
 * Contiene la propiedad `isActive` para filtrar los resultados.
 *
 * English:
 * Defines the structure of the `data` object passed to the `getDocumentTypes` function.
 * It contains the `isActive` property to filter results.
 */
interface FilterData {
  isActive: boolean;
}

/**
 * DOCUMENT_TYPE_API
 *
 * Spanish:
 * Objeto que encapsula la funcionalidad de la API relacionada con los tipos de documento.
 * Proporciona el método getDocumentTypes para obtener la lista de tipos de documento filtrados por el estado activo.
 *
 * English:
 * Object that encapsulates the API functionality related to document types.
 * It provides the getDocumentTypes method to fetch the list of document types filtered by active status.
 */
export const DOCUMENT_TYPE_API = {
  /**
   * getDocumentTypes
   *
   * Spanish:
   * Realiza una petición GET para obtener los tipos de documento, filtrando por el parámetro "isActive".
   *
   * English:
   * Performs a GET request to retrieve document types, filtering by the "isActive" parameter.
   *
   * @param {FilterData} data - Objeto que debe incluir la propiedad "isActive" para filtrar los tipos de documento.
   *                            / Object that should include the "isActive" property to filter document types.
   * @returns {Promise<ApiResponse>} Una promesa que se resuelve con la respuesta de la API.
   *                                 / A promise that resolves with the API response.
   */
  getDocumentTypes: (data: FilterData): Promise<ApiResponse> => {
    return axiosHttp({
      path: `${SERVICE_DOCUMENT_TYPE}?isActive=${data.isActive}`,
      method: "GET",
      session: { token: GET_TOKEN },
    });
  },
};