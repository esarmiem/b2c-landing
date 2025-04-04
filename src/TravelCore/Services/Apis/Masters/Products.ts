import { axiosHttp } from '@/TravelCore/Utils/http.ts'
import { SERVICE_PRODUCTS } from '@/TravelCore/Utils/constants.ts'
import { GET_TOKEN } from '@/TravelCore/Utils/storage.ts'
import type { ProductsData } from '@/TravelCore/Utils/interfaces/Products.ts'

/**
 * ApiResponse
 *
 * Spanish:
 * Define la estructura de la respuesta de la API para obtener productos.
 * Contiene los datos de tipo ProductsData y un mensaje de error, si lo hay.
 *
 * English:
 * Defines the structure of the API response for fetching products.
 * It includes data of type ProductsData and an error message, if any.
 */
interface ApiResponse {
  data: ProductsData
  error: string | null
}

/**
 * FilterData
 *
 * Spanish:
 * Define la estructura del objeto `data` que se pasa a la función `getProducts`.
 * Contiene la propiedad `isActive` para filtrar los resultados.
 *
 * English:
 * Defines the structure of the `data` object passed to the `getProducts` function.
 * It contains the `isActive` property to filter results.
 */
interface FilterData {
  isActive: boolean
}

/**
 * PRODUCTS_API
 *
 * Spanish:
 * Objeto que encapsula la funcionalidad de la API relacionada con los productos.
 * Proporciona el método getProducts para obtener la lista de productos filtrados por el estado activo.
 *
 * English:
 * Object that encapsulates the API functionality related to products.
 * It provides the getProducts method to fetch the list of products filtered by active status.
 */
export const PRODUCTS_API = {
  /**
   * getProducts
   *
   * Spanish:
   * Realiza una petición GET para obtener productos.
   * Se filtran los productos utilizando el parámetro "isActive" proporcionado en el objeto "data".
   *
   * English:
   * Performs a GET request to retrieve products.
   * Products are filtered using the "isActive" parameter provided in the "data" object.
   *
   * @param {FilterData} data - Objeto que debe incluir la propiedad "isActive" para filtrar los productos.
   *                            / Object that should include the "isActive" property to filter products.
   * @returns {Promise<ApiResponse>} Una promesa que se resuelve con la respuesta de la API.
   *                                 / A promise that resolves with the API response.
   */
  getProducts: (data: FilterData): Promise<ApiResponse> => {
    return axiosHttp({
      path: `${SERVICE_PRODUCTS}?isActive=${data.isActive}`,
      method: 'GET',
      session: { token: GET_TOKEN }
    })
  }
}
