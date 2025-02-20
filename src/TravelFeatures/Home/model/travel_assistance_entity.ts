import { ASSISTANCE_API } from "@/TravelCore/Services/Apis/Order";
import {
  dataOrder,
  ResponseData,
} from "@/TravelCore/Utils/interfaces/Order.ts";
/**
 * TravelAssistance
 *
 * Spanish:
 * Clase que encapsula las operaciones de asistencia de viaje.
 * Proporciona un método asíncrono para obtener el precio de una orden basado en la edad,
 * utilizando el servicio ASSISTANCE_API. La respuesta se retorna tipada como ResponseData.
 *
 * English:
 * Class that encapsulates travel assistance operations.
 * It provides an asynchronous method to fetch the order price based on age,
 * using the ASSISTANCE_API service. The response is returned typed as ResponseData.
 */

export class TravelAssistance {
  /**
   * getOrderPriceByAge
   *
   * Spanish:
   * Método asíncrono que obtiene el precio de una orden basado en la edad.
   * Llama al método getOrderPriceEdad del servicio ASSISTANCE_API y retorna la respuesta.
   *
   * English:
   * Asynchronous method that fetches the order price based on age.
   * It calls the getOrderPriceEdad method of the ASSISTANCE_API service and returns the response.
   *
   * @param {dataOrder} data - Los datos de la orden para calcular el precio basado en la edad.
   *                           / The order data to calculate the price based on age.
   * @returns {Promise<ResponseData>} Una promesa que se resuelve con la respuesta de la API.
   *                                  / A promise that resolves with the API response.
   */
  async getOrderPriceByAge(data: dataOrder): Promise<ResponseData> {
    const response = await ASSISTANCE_API.getOrderPriceEdad(data);
    return response as unknown as ResponseData;
  }
}
