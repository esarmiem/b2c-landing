/**
 * QuestionItems
 *
 * Spanish:
 * Define la estructura de cada elemento de pregunta. Incluye el identificador de la pregunta, su descripción,
 * el estado activo y el tipo de viaje asociado.
 *
 * English:
 * Defines the structure for each question item. It includes the question identifier, its description,
 * active status, and the associated travel type.
 */
export interface QuestionItems {
  idPregunta: number;
  descripcion: string;
  estaActivo: boolean;
  tipoViaje: string;
}

/**
 * QuestionData
 *
 * Spanish:
 * Define la estructura de los datos de preguntas obtenidos de una API. Incluye información de paginación:
 * el total de elementos, la página actual, el total de páginas y una lista de elementos de pregunta.
 * Además, contiene enlaces a la siguiente y la página anterior.
 *
 * English:
 * Defines the structure for question data retrieved from an API. It includes pagination details:
 * total number of items, current page, total pages, and a list of question items.
 * It also includes links to the next and previous pages.
 */
export interface QuestionData {
  total: number;
  page: number;
  totalPages: number;
  items: QuestionItems[];
  next: string | null;
  prev: string | null;
}
