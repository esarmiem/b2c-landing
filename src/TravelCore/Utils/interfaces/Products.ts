/**
 * ProductsPregunta
 *
 * Spanish:
 * Define la estructura de una pregunta relacionada con los productos. Incluye el identificador de la pregunta,
 * la descripción, el estado activo y el tipo de viaje asociado.
 *
 * English:
 * Defines the structure of a product-related question. It includes the question identifier,
 * description, active status, and the associated travel type.
 */
export interface ProductsPregunta {
  idPregunta: number;
  descripcion: string;
  estaActivo: boolean;
  tipoViaje: string;
}

/**
 * ProductsItems
 *
 * Spanish:
 * Define la estructura de cada producto. Incluye detalles como el identificador del producto, nombre,
 * descripción interna, tipo, identificador de la pregunta asociada, estado activo, porcentaje de descuento,
 * tiempo mínimo y máximo, y la pregunta relacionada (ProductsPregunta).
 *
 * English:
 * Defines the structure of each product item. It includes details such as the product identifier, name,
 * internal description, type, associated question identifier, active status, discount percentage,
 * minimum and maximum time, and the related question (ProductsPregunta).
 */
export interface ProductsItems {
  idProducto: number;
  nombre: string;
  descripcionInterna: string;
  tipo: string;
  idPregunta: number;
  estaActivo: boolean;
  porcentajeDescuento: string;
  tiempoMinimo: string;
  tiempoMaximo: string;
  pregunta: ProductsPregunta;
}

/**
 * ProductsData
 *
 * Spanish:
 * Define la estructura de los datos de productos obtenidos de una API. Incluye información de paginación:
 * el total de elementos, la página actual, el total de páginas y una lista de productos. Además, incluye
 * enlaces a la página siguiente y a la anterior.
 *
 * English:
 * Defines the structure for product data retrieved from an API. It includes pagination details:
 * total items, current page, total pages, and a list of products. It also includes links to the next
 * and previous pages.
 */
export interface ProductsData {
  total: number;
  page: number;
  totalPages: number;
  items: ProductsItems[];
  next: string | null;
  prev: string | null;
}
