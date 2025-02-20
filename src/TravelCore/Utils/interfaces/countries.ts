/**
 * CountriesItems
 *
 * Spanish:
 * Define la estructura de cada elemento de un país. Incluye el identificador del país, una descripción,
 * el estado activo, el código ISO, el indicativo telefónico (opcional) y un indicador de si la comunicación internacional está activa.
 *
 * English:
 * Defines the structure of each country item. It includes the country's identifier, a description,
 * its active status, the ISO code, an optional telephone indicator, and a flag indicating whether international communication is active.
 */
export interface CountriesItems {
  idPais: number;
  descripcion: string;
  estaActivo: boolean;
  codigoISO: string;
  indicativo: string | null;
  comInternActivo: boolean;
}

/**
 * CountriesData
 *
 * Spanish:
 * Define la estructura de los datos de países obtenidos de una API o fuente de datos. Incluye información de paginación
 * (total, página actual, total de páginas) y una lista de elementos de país.
 *
 * English:
 * Defines the structure for country data obtained from an API or data source. It includes pagination details
 * (total items, current page, total pages) and a list of country items.
 */
export interface CountriesData {
  total: number;
  page: number;
  totalPages: number;
  items: CountriesItems[];
  next: string | null;
  previous: string | null;
}

/**
 * CitiesByCountryData
 *
 * Spanish:
 * Define la estructura de los datos de ciudades filtradas por país. Incluye el identificador de la ciudad,
 * su descripción, un código, el estado activo y el identificador del país al que pertenecen.
 *
 * English:
 * Defines the structure for city data filtered by country. It includes the city's identifier,
 * description, a code, its active status, and the identifier of the country to which it belongs.
 */
export interface CitiesByCountryData {
  idCiudad: number;
  descripcion: string;
  codigo: string;
  estaActivo: boolean;
  idPais: number;
}
