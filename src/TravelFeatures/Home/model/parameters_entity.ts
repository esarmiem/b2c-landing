import { MastersServices } from "@/TravelCore/Services/Apis/Masters";
/**
 * Parameters
 *
 * Spanish:
 * Clase que encapsula la obtención y el filtrado de parámetros maestros.
 * El método getParameters obtiene todos los parámetros activos y luego filtra
 * aquellos que coinciden con el idioma especificado.
 *
 * English:
 * Class that encapsulates the retrieval and filtering of master parameters.
 * The getParameters method fetches all active parameters and then filters
 * those that match the specified language.
 */
export class Parameters {
  /**
   * getParameters
   *
   * Spanish:
   * Método asíncrono que obtiene los parámetros activos y filtra los resultados por idioma.
   *
   * English:
   * Asynchronous method that fetches active parameters and filters the results by language.
   *
   * @param {string} lang - El idioma por el cual filtrar los parámetros.
   *                        / The language to filter the parameters by.
   * @returns {Promise<any>} Una promesa que se resuelve con los parámetros filtrados.
   *                         / A promise that resolves with the filtered parameters.
   */
  async getParameters(lang: string): Promise<any> {
    const response: any = await MastersServices.parametersApi.getParameters({
      isActive: true,
    });
    return response.filter((item: any) => item.idioma === lang);
  }
}
