import { AUTH_ISL_API } from '@/TravelCore/Services/Apis/AuthenticationISL'
import type { CheckPreorderISLResponse, ResponseData, dataOrder, dataPreorder } from '@/TravelCore/Utils/interfaces/Order.ts'
import type { Upgrade } from '@/TravelCore/Utils/interfaces/Order.ts' // Cambio aquí
import { ISL_APP_SERVICE_UPGRADES, SERVICE_CHECK_PREORDER_ISL, SERVICE_GET_ORDER_PRICE_EDAD } from '../../../Utils/constants.ts'
import { axiosHttp } from '../../../Utils/http.ts'
import { GET_TOKEN } from '../../../Utils/storage.ts'

/**
 * ApiResponse
 *
 * Spanish:
 * Define la estructura de la respuesta de la API para operaciones de asistencia.
 *
 * English:
 * Defines the structure of the API response for assistance operations.
 */
interface ApiResponse {
  data: ResponseData
  error: string | null
}

/**
 * ApiCheckPreOrderResponse
 *
 * Spanish:
 * Define la estructura de la respuesta de la API para la verificación de preorden ISL.
 *
 * English:
 * Defines the structure of the API response for checking ISL preorders.
 */
interface ApiCheckPreOrderResponse {
  data: CheckPreorderISLResponse
  error: string | null
}

/**
 * PayloadUpgrades
 *
 * Spanish:
 * Define la estructura del objeto de carga útil para solicitar actualizaciones de productos,
 * incluyendo el identificador del plan y el idioma.
 *
 * English:
 * Defines the structure of the payload object for requesting product upgrades,
 * including the plan ID and the language.
 */
interface PayloadUpgrades {
  id_plan : string
  language : string
}

/**
 * getProductUpdates
 *
 * Spanish:
 * Función asíncrona que obtiene actualizaciones de productos mediante un servicio ISL.
 * Primero, autentica al usuario utilizando AUTH_ISL_API.loginISL para obtener un token,
 * luego construye los parámetros de consulta y realiza una petición GET a ISL_APP_SERVICE_UPGRADES.
 *
 * English:
 * Asynchronous function that fetches product updates via an ISL service.
 * First, it authenticates the user using AUTH_ISL_API.loginISL to obtain a token,
 * then it builds the query parameters and makes a GET request to ISL_APP_SERVICE_UPGRADES.
 *
 * @param {PayloadUpgrades} payload - Objeto que contiene el id_plan y el idioma para la solicitud.
 *                                    / Object containing the plan ID and language for the request.
 * @returns {Promise<any>} La respuesta de la API, extraída de la propiedad "data".
 *                         / The API response, extracted from the "data" property.
 */
export const getProductUpdates = async (payload: PayloadUpgrades): Promise<Upgrade[]> => { // Cambio aquí
  const authISL = await AUTH_ISL_API.loginISL();
  const queryParams = new URLSearchParams({
    request: "get_upgrade",
    token: authISL?.data?.result?.token,
    id_plan: payload.id_plan.toString(),
    language: payload.language
  }).toString()
  const url = `${ISL_APP_SERVICE_UPGRADES}?${queryParams}`;
  try {
    const response = await axiosHttp({
      method: "GET",
      pathISL: url,
      customConfig: {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching product updates:', error)
    throw error
  }
};

/**
 * ASSISTANCE_API
 *
 * Spanish:
 * Objeto que encapsula funciones relacionadas con operaciones de asistencia en el sistema.
 * Incluye métodos para obtener el precio de una orden basado en edad y para verificar preórdenes ISL.
 *
 * English:
 * Object that encapsulates functions related to assistance operations in the system.
 * It includes methods to fetch the order price based on age and to check ISL preorders.
 */
export const ASSISTANCE_API = {
  /**
   * getOrderPriceEdad
   *
   * Spanish:
   * Realiza una petición POST para obtener el precio de una orden basado en la edad.
   * Envía los datos de la orden en formato JSON y utiliza un token de sesión para la autenticación.
   *
   * English:
   * Performs a POST request to retrieve the order price based on age.
   * It sends the order data as JSON and uses a session token for authentication.
   *
   * @param {dataOrder} data - Datos de la orden que se utilizarán para calcular el precio.
   *                           / Order data to be used for calculating the price.
   * @returns {Promise<ApiResponse>} Una promesa que se resuelve con la respuesta de la API.
   *                                 / A promise that resolves with the API response.
   */
  getOrderPriceEdad: (data: dataOrder): Promise<ApiResponse> => {
    return axiosHttp({
      path: `${SERVICE_GET_ORDER_PRICE_EDAD}`,
      method: "POST",
      data: JSON.stringify(data),
      session: { token: GET_TOKEN }
    })
  },

  /**
   * checkPreorderISL
   *
   * Spanish:
   * Realiza una petición POST para verificar una preorden en el sistema ISL.
   * Envía los datos de preorden en formato JSON y utiliza un token de sesión para la autenticación.
   *
   * English:
   * Performs a POST request to check a preorder in the ISL system.
   * It sends the preorder data as JSON and uses a session token for authentication.
   *
   * @param {dataPreorder} data - Datos de la preorden que se deben verificar.
   *                              / Preorder data that needs to be checked.
   * @returns {Promise<ApiCheckPreOrderResponse>} Una promesa que se resuelve con la respuesta de la API.
   *                                              / A promise that resolves with the API response.
   */
  checkPreorderISL: (data: dataPreorder): Promise<ApiCheckPreOrderResponse> => {
    return axiosHttp({
      path: `${SERVICE_CHECK_PREORDER_ISL}`,
      method: "POST",
      data: JSON.stringify(data),
      session: { token: GET_TOKEN }
    })
  }
}
