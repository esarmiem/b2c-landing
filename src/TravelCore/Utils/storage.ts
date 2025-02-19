/**
 * GET_TOKEN
 *
 * Spanish:
 * Obtiene el token de autenticación almacenado en sessionStorage bajo la clave 'token'.
 * Si no existe, retorna una cadena vacía.
 *
 * English:
 * Retrieves the authentication token stored in sessionStorage under the key 'token'.
 * If it doesn't exist, it returns an empty string.
 */
export const GET_TOKEN: string = window.sessionStorage.getItem("token") || "";
/**
 * GET_TOKEN_ISL
 *
 * Spanish:
 * Obtiene el token de autenticación para ISL almacenado en sessionStorage bajo la clave 'token_isl'.
 * Si no existe, retorna una cadena vacía.
 *
 * English:
 * Retrieves the authentication token for ISL stored in sessionStorage under the key 'token_isl'.
 * If it doesn't exist, it returns an empty string.
 */
export const GET_TOKEN_ISL: string =
  window.sessionStorage.getItem("token_isl") || "";
