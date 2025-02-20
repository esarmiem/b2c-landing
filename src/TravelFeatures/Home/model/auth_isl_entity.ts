import { AUTH_ISL_API } from "@/TravelCore/Services/Apis/AuthenticationISL";
/**
 * AuthISL
 *
 * Spanish:
 * Clase que encapsula la funcionalidad de autenticación para ISL utilizando el servicio AUTH_ISL_API.
 * Permite iniciar sesión en el sistema ISL delegando la petición al servicio correspondiente.
 *
 * English:
 * Class that encapsulates the authentication functionality for ISL using the AUTH_ISL_API service.
 * It allows logging into the ISL system by delegating the request to the corresponding service.
 */
export class AuthISL {
  /**
   * loginISL
   *
   * Spanish:
   * Método asíncrono que realiza el inicio de sesión en ISL.
   * Llama al método loginISL del servicio AUTH_ISL_API y retorna la respuesta de autenticación.
   *
   * English:
   * Asynchronous method that performs the login for ISL.
   * It calls the loginISL method from the AUTH_ISL_API service and returns the authentication response.
   *
   * @returns {Promise<any>} Una promesa que se resuelve con la respuesta del servicio de autenticación de ISL.
   *                         / A promise that resolves with the response from the ISL authentication service.
   */
  async loginISL(): Promise<any> {
    return await AUTH_ISL_API.loginISL();
  }
}
