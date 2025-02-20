/**
 * ArrivalsItems
 *
 * Spanish:
 * Define la estructura de cada elemento de llegada. Incluye el identificador del destino, la descripción,
 * un código numérico y el estado activo del destino.
 *
 * English:
 * Defines the structure of each arrival item. It includes the destination identifier, description,
 * a numeric code, and the active status of the destination.
 */
export interface ArrivalsItems {
  idDestino: number;
  descripcion: string;
  codigo: number;
  estaActivo: boolean;
}

/**
 * ArrivalsData
 *
 * Spanish:
 * Define la estructura de los datos de llegadas. Este objeto contiene información sobre la paginación,
 * el total de elementos, la página actual, el total de páginas y la lista de elementos de llegada.
 * Además, incluye enlaces a la página siguiente y anterior si están disponibles.
 *
 * English:
 * Defines the structure for arrivals data. This object contains pagination information,
 * the total number of items, the current page, the total pages, and a list of arrival items.
 * It also includes links to the next and previous pages if available.
 */
export interface ArrivalsData {
  total: number;
  page: number;
  totalPages: number;
  items: ArrivalsItems[];
  next: string | null;
  prev: string | null;
}
