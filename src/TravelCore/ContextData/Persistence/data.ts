/* 
  This TypeScript code snippet defines two functions for storing and retrieving data 
  from the browser's localStorage.

  Este fragmento de código TypeScript define dos funciones para almacenar y recuperar datos 
  desde el localStorage del navegador.
*/
import {
  ApiResponse,
  StorageData,
  GlobalData,
} from "@/TravelCore/Utils/interfaces/context.ts";

// Configuración de almacenamiento / Storage configuration
const STORAGE_CONFIG = {
  VERSION: "1.0.0",
  MAX_SIZE: 5 * 1024 * 1024, // 5 MB en bytes / 5 MB in bytes
} as const;

/**
 * getPersisted
 *
 * Spanish:
 * Recupera datos almacenados en el localStorage utilizando una clave dada. La función intenta
 * parsear la cadena JSON obtenida y validar su estructura y versión. Si el valor obtenido es
 * nulo, vacío o no cumple con la estructura esperada (especialmente para la clave "tk-order"),
 * se elimina del almacenamiento y se retorna null.
 *
 * English:
 * Retrieves stored data from localStorage using the provided key. The function attempts to
 * parse the JSON string obtained and validate its structure and version. If the retrieved
 * value is null, empty, or does not meet the expected structure (especially for the "tk-order" key),
 * it is removed from storage and null is returned.
 *
 * @param {string} StorageKey - La clave utilizada para acceder a los datos en localStorage.
 *                              / The key used to access data in localStorage.
 * @returns {ApiResponse | GlobalData | null} - Los datos almacenados, o null si no se encuentran o son inválidos.
 *                                              / The stored data, or null if not found or invalid.
 */
export const getPersisted = (
  StorageKey: string,
): ApiResponse | GlobalData | null => {
  try {
    const rawState = window.localStorage.getItem(StorageKey);
    // Verifica si el estado es nulo o un objeto vacío "{}"
    // Checks if the state is null or an empty object "{}"
    if (rawState === null || (rawState && rawState.toString() === "{}"))
      return null;
    // Parsear y validar estructura
    // Parse and validate structure
    const parsed = JSON.parse(rawState) as StorageData<ApiResponse>;
    // Validar versión y estructura específica para "tk-order"
    // Validate version and structure specifically for "tk-order"
    if (StorageKey === "tk-order" && !parsed.data) {
      window.localStorage.removeItem(StorageKey);
      return null;
    }
    return parsed.data;
  } catch (err) {
    console.error(`Error reading from storage (${StorageKey}):`, err);
    // En caso de error, elimina la clave del almacenamiento y retorna null
    // In case of error, remove the key from storage and return null
    window.localStorage.removeItem(StorageKey);
    return null;
  }
};
/**
 * savePersistense
 *
 * Spanish:
 * Guarda un estado en el localStorage bajo la clave especificada. Si el estado es null, elimina
 * cualquier dato existente asociado a la clave. La función crea un objeto que incluye el estado,
 * la marca de tiempo actual y la versión, y lo guarda en formato JSON. En caso de errores, especialmente
 * por exceder la cuota de almacenamiento, se intenta limpiar y reintentar la operación.
 *
 * English:
 * Saves a state in localStorage under the specified key. If the state is null, it removes any existing
 * data associated with the key. The function creates an object that includes the state, the current timestamp,
 * and the version, then saves it in JSON format. In case of errors, especially quota exceeded errors,
 * it attempts to clean up and retry the operation.
 *
 * @param {ApiResponse | GlobalData} state - Los datos que se desean almacenar.
 *                                           / The data to be stored.
 * @param {string} StorageKey - La clave bajo la cual se almacenarán los datos en localStorage.
 *                              / The key under which the data will be stored in localStorage.
 * @returns {void}
 */
export const savePersistense = (
  state: ApiResponse | GlobalData,
  StorageKey: string,
): void => {
  let rawState: string;

  try {
    // Si el estado es null, elimina la clave del almacenamiento y finaliza.
    // If the state is null, remove the key from storage and exit.
    if (state === null) {
      window.localStorage.removeItem(StorageKey);
      return;
    }
    // Crear el objeto de datos a almacenar, clonando el estado para evitar mutaciones.
    // Create the storage object, cloning the state to avoid mutations.
    const storageData: StorageData<ApiResponse | GlobalData> = {
      data: structuredClone(state),
      timestamp: Date.now(),
      version: STORAGE_CONFIG.VERSION,
    };

    rawState = JSON.stringify(storageData);
    window.localStorage.setItem(StorageKey, rawState);
  } catch (err) {
    console.error(`Error saving to storage (${StorageKey}):`, err);
    // En caso de error de cuota excedida, se elimina el elemento y se reintenta guardar.
    // In case of quota exceeded error, remove the item and retry saving.
    if (err instanceof Error && err.name === "QuotaExceededError") {
      window.localStorage.removeItem(StorageKey);
      try {
        window.localStorage.setItem(StorageKey, rawState!);
      } catch (retryErr) {
        console.error("Failed to save even after cleanup:", retryErr);
      }
    }
  }
};
