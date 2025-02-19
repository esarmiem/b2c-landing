import { dataOrder, Data } from "@/TravelCore/Utils/interfaces/Order.ts";

/**
 * GenericItem
 *
 * Spanish:
 * Representa un objeto genérico con claves de tipo string y valores de cualquier tipo.
 *
 * English:
 * Represents a generic object with string keys and values of any type.
 */
export interface GenericItem {
  [key: string]: any;
}

/**
 * ApiResponse
 *
 * Spanish:
 * Define la estructura de la respuesta paginada de una API.
 * Incluye información sobre el total de elementos, la página actual, el total de páginas,
 * los elementos devueltos y los índices de la página siguiente y anterior.
 *
 * English:
 * Defines the structure of a paginated API response.
 * It includes details about the total number of items, current page, total pages,
 * the returned items, and the indexes for the next and previous pages.
 *
 * @template T - El tipo de los elementos en la respuesta. / The type of the items in the response.
 */
export interface ApiResponse<T = GenericItem> {
  total: number;
  page: number;
  totalPages: number;
  items: T[];
  next: number | null;
  prev: number | null;
}

/**
 * StorageData
 *
 * Spanish:
 * Representa la estructura de los datos almacenados en el almacenamiento persistente.
 * Contiene el dato en sí, la marca de tiempo de almacenamiento y la versión de los datos.
 *
 * English:
 * Represents the structure of data stored in persistent storage.
 * It includes the actual data, a timestamp when it was stored, and the version of the data.
 *
 * @template T - El tipo de dato que se almacena. / The type of data being stored.
 */
export interface StorageData<T = any> {
  data: T;
  timestamp: number;
  version: string;
}

/**
 * GlobalData
 *
 * Spanish:
 * Define la estructura de datos globales que pueden incluir información relacionada con órdenes.
 * Es opcional y puede contener el payload de la orden y la respuesta de la orden.
 *
 * English:
 * Defines the structure for global data that may include order-related information.
 * It is optional and can include the order payload and order response.
 */
export interface GlobalData {
  payloadOrder: dataOrder;
  responseOrder: Data;
}
