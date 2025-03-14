import { AUTH_API } from "@/TravelCore/Services/Apis/Authentication";

/**
 * Auth
 *
 * Spanish:
 * Clase que encapsula la funcionalidad de autenticación utilizando el servicio AUTH_API.
 * Esta clase expone un método asíncrono para iniciar sesión, delegando la solicitud al servicio de autenticación.
 *
 * English:
 * Class that encapsulates the authentication functionality using the AUTH_API service.
 * This class exposes an asynchronous method to perform user login, delegating the request to the authentication service.
 */
export class Auth {
  /**
   * login
   *
   * Spanish:
   * Método asíncrono que realiza el inicio de sesión del usuario.
   * Llama al método login del servicio AUTH_API y retorna la respuesta.
   *
   * English:
   * Asynchronous method that performs user login.
   * It calls the login method from the AUTH_API service and returns the response.
   *
   * @returns {Promise<any>} Una promesa que se resuelve con la respuesta del servicio de autenticación.
   *                         / A promise that resolves with the authentication service response.
   */
  async login(): Promise<any> {
    return await AUTH_API.login();
  }
}
