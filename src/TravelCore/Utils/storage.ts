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
export const GET_TOKEN: string = sessionStorage.getItem('token')
