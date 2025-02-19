import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL } from "./constants.ts";

/**
 * Session
 *
 * Spanish:
 * Define la estructura de una sesión, que puede incluir un token de autenticación, rol e identificador de usuario.
 *
 * English:
 * Defines the structure for a session, which may include an authentication token, role, and user ID.
 */
interface Session {
  token?: string;
  role?: any;
  user_id?: number;
}
/**
 * AxiosHttpArgs
 *
 * Spanish:
 * Define los argumentos necesarios para configurar y realizar una solicitud HTTP con axios.
 *
 * English:
 * Defines the necessary arguments to configure and make an HTTP request using axios.
 */
interface AxiosHttpArgs {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path?: string;
  pathISL?: string;
  session?: Session | null;
  headers?: Record<string, string>;
  data?: any;
  timeout?: number;
  customConfig?: AxiosRequestConfig;
}

/**
 * getDefaultHeaders
 *
 * Spanish:
 * Genera los encabezados HTTP por defecto para una solicitud. Si se proporciona una sesión con un token,
 * se añade el encabezado Authorization. También se configuran los encabezados Accept, Content-Type y Access-Control-Allow-Origin.
 *
 * English:
 * Generates the default HTTP headers for a request. If a session with a token is provided,
 * the Authorization header is added. It also sets the Accept, Content-Type, and Access-Control-Allow-Origin headers.
 *
 * @param {Session} [session] - La sesión que puede contener un token de autenticación. / The session that may contain an authentication token.
 * @returns {Record<string, string>} Los encabezados HTTP por defecto. / The default HTTP headers.
 */
const getDefaultHeaders = (session?: Session): Record<string, string> => {
  const defaultHeaders: Record<string, string> = {};

  if (session && session.token) {
    defaultHeaders.Authorization = "Bearer " + session.token;
    //defaultHeaders.apiKey = API_KEY;
  }

  //defaultHeaders['apiKey'] = API_KEY;
  defaultHeaders["Accept"] = "application/json";
  defaultHeaders["Content-Type"] = "application/json";
  defaultHeaders["Access-Control-Allow-Origin"] = "*";
  return defaultHeaders;
};

/**
 * axiosHttp
 *
 * Spanish:
 * Función asíncrona que realiza una solicitud HTTP utilizando axios. Permite personalizar la solicitud mediante varios parámetros,
 * como el método, la URL (o path), datos, encabezados, sesión, tiempo de espera y configuración personalizada.
 * Se utiliza la función getDefaultHeaders para configurar los encabezados por defecto.
 * Retorna un objeto con los datos de la respuesta o un mensaje de error en caso de fallo.
 *
 * English:
 * Asynchronous function that makes an HTTP request using axios. It allows customizing the request through various parameters,
 * such as method, URL (or path), data, headers, session, timeout, and custom configuration.
 * The getDefaultHeaders function is used to configure the default headers.
 * It returns an object with the response data or an error message in case of failure.
 *
 * @param {AxiosHttpArgs} args - Los argumentos para configurar la solicitud HTTP. / The arguments to configure the HTTP request.
 * @returns {Promise<{ data: any; error: string | null }>} Una promesa que se resuelve con un objeto que contiene
 *                                                         los datos de la respuesta o un mensaje de error.
 *                                                         / A promise that resolves with an object containing the response data or an error message.
 */
export const axiosHttp = async (
  args: AxiosHttpArgs,
): Promise<{ data: any; error: string | null }> => {
  // Si se proporciona pathISL, se utiliza esa URL; de lo contrario, se construye la URL a partir de BASE_URL y path.
  const url = args.pathISL ? args.pathISL : `${BASE_URL}/${args.path}`;
  // Combina los encabezados por defecto con los encabezados personalizados, si se proporciona una sesión.
  const headers = args.session
    ? { ...getDefaultHeaders(args.session), ...args.headers }
    : args.headers;

  // Configuración base para la solicitud HTTP.
  const config: AxiosRequestConfig = {
    method: args.method,
    url: url,
    headers: headers,
    data: args.data,
    timeout: args.timeout || 60000,
  };
  try {
    // Realiza la solicitud HTTP usando axios, fusionando la configuración base con cualquier configuración personalizada.
    const response: AxiosResponse = await axios({
      ...config,
      ...args.customConfig,
    });
    return { data: response.data, error: null };
  } catch (error: any) {
    // En caso de error, retorna data null y extrae un mensaje de error si está disponible.
    return {
      data: null,
      error: error?.response?.data?.message || "Unknown error",
    };
  }
};
