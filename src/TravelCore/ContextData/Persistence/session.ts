/**
 * SESSION_KEYS
 *
 * Spanish:
 * Define las claves de sesión utilizadas para almacenar datos en sessionStorage.
 *
 * English:
 * Defines the session keys used to store data in sessionStorage.
 */
const SESSION_KEYS: string[] = ["token", "role", "user_id", "token_isl"];

/**
 * getPersistedSession
 *
 * Spanish:
 * Esta variable exportada contiene el estado persistido en sessionStorage para cada clave definida en SESSION_KEYS.
 * Se utiliza una IIFE (Immediately Invoked Function Expression) para inicializar el estado al cargar el módulo.
 *
 * English:
 * This exported variable holds the persisted state from sessionStorage for each key defined in SESSION_KEYS.
 * It uses an IIFE (Immediately Invoked Function Expression) to initialize the state when the module loads.
 *
 * @returns {Record<string, string>} Un objeto con cada clave y su valor correspondiente del sessionStorage.
 *                                     / An object with each key and its corresponding value from sessionStorage.
 */
/* Use an IIFE to export the persisted state in a variable */
export const getPersistedSession: Record<string, string> = (() => {
  try {
    const state: Record<string, string> = {};
    // Itera sobre cada clave en SESSION_KEYS para recuperar su valor desde sessionStorage.
    // Iterates over each key in SESSION_KEYS to retrieve its value from sessionStorage.
    SESSION_KEYS.forEach((key) => {
      state[key] = window.sessionStorage.getItem(key) || "";
    });
    return state;
  } catch (err) {
    // En caso de error, retorna un objeto vacío.
    // In case of an error, return an empty object.
    return {};
  }
})();

/**
 * saveSession
 *
 * Spanish:
 * Guarda el estado actual en sessionStorage para las claves definidas en SESSION_KEYS.
 * Si el objeto de estado proporcionado está vacío, elimina las entradas correspondientes en sessionStorage.
 *
 * English:
 * Saves the current state in sessionStorage for the keys defined in SESSION_KEYS.
 * If the provided state object is empty, it removes the corresponding entries from sessionStorage.
 *
 * @param {Record<string, string>} state - El estado a guardar, representado como un objeto con claves y valores.
 *                                           / The state to save, represented as an object with keys and values.
 */
/* Export a method to save state on each store update */
export const saveSession = (state: Record<string, string>): void => {
  try {
    // Si el objeto de estado está vacío, elimina cada clave de SESSION_KEYS de sessionStorage.
    // If the state object is empty, remove each key in SESSION_KEYS from sessionStorage.
    if (Object.keys(state).length <= 0) {
      SESSION_KEYS.forEach((key) => {
        window.sessionStorage.removeItem(key);
      });
      return;
    }
    // Itera sobre cada clave en SESSION_KEYS para guardar su valor correspondiente en sessionStorage.
    // Iterates over each key in SESSION_KEYS to save its corresponding value in sessionStorage.
    SESSION_KEYS.forEach((key) => {
      const value = state[key];
      if (value !== null) {
        window.sessionStorage.setItem(key, value);
      }
    });
  } catch (err) {
    // Ignora los errores de escritura en sessionStorage.
    // Ignores write errors in sessionStorage.
    // Ignore write errors.
  }
};
