/**
 * DocumentTypeItems
 *
 * Spanish:
 * Define la estructura de cada tipo de documento. Incluye el identificador del tipo de documento, la abreviación,
 * el nombre completo y el estado activo.
 *
 * English:
 * Defines the structure of each document type item. It includes the document type identifier, its abbreviation,
 * full name, and active status.
 */
export interface DocumentTypeItems {
  idTipoDocumento: number;
  abreviacion: string;
  nombre: string;
  estaActivo: boolean;
}

/**
 * DocumentTypeData
 *
 * Spanish:
 * Define la estructura de los datos relacionados con los tipos de documento. Incluye información de paginación:
 * el total de elementos, la página actual, el total de páginas, y una lista de elementos de tipo de documento.
 * Además, contiene enlaces a la página siguiente y anterior.
 *
 * English:
 * Defines the structure for document type data. It includes pagination details such as the total number of items,
 * the current page, total pages, and a list of document type items. It also contains links to the next and previous pages.
 */
export interface DocumentTypeData {
  total: number;
  page: number;
  totalPages: number;
  items: DocumentTypeItems[];
  next: string | null;
  prev: string | null;
}
