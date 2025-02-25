import { axiosHttp } from "@/TravelCore/Utils/http.ts";
import {
  SERVICE_COUNTRIES,
  SERVICE_GET_CITIES_BY_COUNTRY,
} from "@/TravelCore/Utils/constants.ts";
import { GET_TOKEN } from "@/TravelCore/Utils/storage.ts";
import {
  CountriesData,
  CitiesByCountryData,
} from "@/TravelCore/Utils/interfaces/countries.ts";

/**
 * countriesResponse
 *
 * Spanish:
 * Define la estructura de la respuesta de la API para obtener países.
 * Contiene los datos de países y un mensaje de error (si lo hay).
 *
 * English:
 * Defines the structure of the API response for fetching countries.
 * It contains the countries data and an error message, if any.
 */
interface countriesResponse {
  data: CountriesData;
  error: string | null;
}

/**
 * citiesByCountryResponse
 *
 * Spanish:
 * Define la estructura de la respuesta de la API para obtener ciudades de un país.
 * Contiene un arreglo de datos de ciudades y un mensaje de error (si lo hay).
 *
 * English:
 * Defines the structure of the API response for fetching cities by country.
 * It contains an array of cities data and an error message, if any.
 */
interface citiesByCountryResponse {
  data: CitiesByCountryData[];
  error: string | null;
}

/**
 * FilterData
 *
 * Spanish:
 * Define la estructura del objeto `data` que se pasa a las funciones `getCountries` y `getCitiesByCountry`.
 * Contiene la propiedad `isActive` para filtrar los resultados.
 *
 * English:
 * Defines the structure of the `data` object passed to `getCountries` and `getCitiesByCountry` functions.
 * It contains the `isActive` property to filter results.
 */
interface FilterData {
  isActive: boolean;
}

/**
 * COUNTRIES_API
 *
 * Spanish:
 * Objeto que encapsula las funcionalidades de la API relacionadas con países y ciudades.
 * Proporciona métodos para obtener países y ciudades filtrados por el estado activo.
 *
 * English:
 * Object that encapsulates API functionalities related to countries and cities.
 * It provides methods to fetch countries and cities filtered by their active status.
 */
export const COUNTRIES_API = {
  /**
   * getCountries
   *
   * Spanish:
   * Realiza una petición GET para obtener la lista de países, filtrando por el estado activo.
   *
   * English:
   * Performs a GET request to retrieve the list of countries, filtering by active status.
   *
   * @param {FilterData} data - Objeto que debe incluir la propiedad "isActive" para filtrar los países.
   *                            / Object that should include the "isActive" property to filter countries.
   * @returns {Promise<countriesResponse>} Una promesa que se resuelve con la respuesta de la API.
   *                                       / A promise that resolves with the API response.
   */
  getCountries: (data: FilterData): Promise<countriesResponse> => {
    return axiosHttp({
      path: `${SERVICE_COUNTRIES}?isActive=${data.isActive}`,
      method: "GET",
      session: { token: GET_TOKEN },
    });
  },

  /**
   * getCitiesByCountry
   *
   * Spanish:
   * Realiza una petición GET para obtener la lista de ciudades de un país, filtrando por el estado activo.
   *
   * English:
   * Performs a GET request to retrieve the list of cities for a country, filtering by active status.
   *
   * @param {FilterData} data - Objeto que debe incluir la propiedad "isActive" para filtrar las ciudades.
   *                            / Object that should include the "isActive" property to filter cities.
   * @returns {Promise<citiesByCountryResponse>} Una promesa que se resuelve con la respuesta de la API.
   *                                             / A promise that resolves with the API response.
   */
  getCitiesByCountry: (data: FilterData): Promise<citiesByCountryResponse> => {
    return axiosHttp({
      path: `${SERVICE_GET_CITIES_BY_COUNTRY}?isActive=${data.isActive}`,
      method: "GET",
      session: { token: GET_TOKEN },
    });
  },
};