import { ASSISTANCE_API } from "@/TravelCore/Services/Apis/Order";
/**
 * Order
 *
 * Spanish:
 * Clase que encapsula operaciones relacionadas con las órdenes. Permite verificar preórdenes y agregar órdenes
 * utilizando el servicio ASSISTANCE_API.
 *
 * English:
 * Class that encapsulates operations related to orders. It allows checking preorders and adding orders
 * using the ASSISTANCE_API service.
 */
export class Order {
  /**
   * checkPreOrder
   *
   * Spanish:
   * Método asíncrono que verifica una preorden. Envía los datos proporcionados a la API para realizar la verificación
   * de la preorden.
   *
   * English:
   * Asynchronous method that checks a preorder. It sends the provided data to the API to perform preorder verification.
   *
   * @param {any} data - Los datos necesarios para verificar la preorden / The data required for preorder verification.
   * @returns {Promise<any>} Una promesa que se resuelve con la respuesta de la API / A promise that resolves with the API response.
   */
  async checkPreOrder(data: any): Promise<any> {
    return await ASSISTANCE_API.checkPreorderISL(data);
  }
  /**
   * addOrder
   *
   * Spanish:
   * Método asíncrono que agrega una orden. Envía los datos de la orden a la API para su creación.
   *
   * English:
   * Asynchronous method that adds an order. It sends the order data to the API for creation.
   *
   * @param {any} data - Los datos de la orden a agregar / The order data to be added.
   * @returns {Promise<any>} Una promesa que se resuelve con la respuesta de la API / A promise that resolves with the API response.
   */
  async addOrder(data: any): Promise<any> {
    return await ASSISTANCE_API.addOrderISL(data);
  }
  /**
   * getIP
   *
   * Spanish:
   * Método asíncrono que se comunica con epayco. Obtiene los datos de la orden a la API de epayco.
   *
   * English:
   * Asynchronous method that epayco connect. It getting the data from the API epayco.
   *
   * @param {any} data - Los datos de la orden a agregar / The order data to be added.
   * @returns {Promise<any>} Una promesa que se resuelve con la respuesta de la API / A promise that resolves with the API response.
   */
  async getIP(): Promise<any> {
    return await ASSISTANCE_API.getIpEpayco();
  }
  /**
   * payment
   *
   * Spanish:
   * Método asíncrono que se comunica con epayco. envia la operacion de pago a la API de epayco.
   *
   * English:
   * Asynchronous method that epayco connect. It getting the data from the API epayco.
   *
   * @param {any} data - Los datos de la orden a agregar / The order data to be added.
   * @param {string} transactionId - El id de la transaccion a epayco / The order data to be added.
   * @returns {Promise<any>} Una promesa que se resuelve con la respuesta de la API / A promise that resolves with the API response.
   */
  async payment(data: string, transactionId: string): Promise<any> {
    return await ASSISTANCE_API.paymentEpayco(data, transactionId);
  }
}
