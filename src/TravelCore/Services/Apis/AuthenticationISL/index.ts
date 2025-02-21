import {
  ISL_USER_NAME,
  ISL_PASSWORD,
  ISL_LOGIN,
} from "@/TravelCore/Utils/constants.ts";
import { axiosHttp } from "@/TravelCore/Utils/http.ts";

/**
 * ISLAuthData
 *
 * Spanish:
 * Define la estructura de los datos de autenticación para ISL, que incluye un estado y un resultado con el token.
 *
 * English:
 * Defines the structure of the ISL authentication data, which includes a status and a result containing the token.
 */
interface ISLAuthData {
  status: string;
  result: {
    token: string;
  };
}

/**
 * ApiResponse
 *
 * Spanish:
 * Define la estructura de la respuesta de la API, que contiene los datos de autenticación de ISL y, en caso de error, un mensaje de error.
 *
 * English:
 * Defines the structure of the API response, which contains the ISL authentication data and, in case of an error, an error message.
 */
interface ApiResponse {
  data: ISLAuthData;
  error: string | null;
}

/**
 * AUTH_ISL_API
 *
 * Spanish:
 * Objeto que encapsula la funcionalidad de autenticación para ISL. La función loginISL realiza una petición POST
 * para autenticar al usuario utilizando las credenciales definidas en las constantes.
 *
 * English:
 * Object that encapsulates the authentication functionality for ISL. The loginISL function performs a POST request
 * to authenticate the user using the credentials defined in the constants.
 */
export const AUTH_ISL_API = {
  /**
   * loginISL
   *
   * Spanish:
   * Realiza una petición POST para autenticar al usuario con las credenciales de ISL.
   *
   * English:
   * Performs a POST request to authenticate the user with ISL credentials.
   *
   * @returns {Promise<ApiResponse>} Una promesa que se resuelve con la respuesta de autenticación de ISL.
   *                                 / A promise that resolves with the ISL authentication response.
   */
  loginISL: (): Promise<ApiResponse> => {
    const authData = { usuario: ISL_USER_NAME, password: ISL_PASSWORD };
    return axiosHttp({
      pathISL: ISL_LOGIN,
      method: "POST",
      data: authData,
      session: null,
    });
  },
};
