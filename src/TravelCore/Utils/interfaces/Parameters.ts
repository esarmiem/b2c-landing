/**
 * Padre
 *
 * Spanish:
 * Define la estructura de la entidad "Padre" utilizada en los parámetros. Contiene información básica como:
 * - idParametro: Identificador del parámetro.
 * - idioma: Idioma del texto.
 * - texto: Contenido o texto asociado.
 * - link: URL de un enlace relacionado.
 * - archivoUrl: URL de un archivo asociado.
 * - descripcion: Descripción del parámetro.
 * - agrupacion: Grupo o categoría al que pertenece.
 * - titulo: Indicador booleano para determinar si es un título.
 * - estado: Estado (activo/inactivo) del parámetro.
 * - pagina: Página a la que está asociado.
 * - idPadre: Identificador del parámetro padre, si existe.
 *
 * English:
 * Defines the structure of the "Padre" entity used in parameters. It includes basic information such as:
 * - idParametro: Parameter identifier.
 * - idioma: Language of the text.
 * - texto: Associated text or content.
 * - link: URL of a related link.
 * - archivoUrl: URL of an associated file.
 * - descripcion: Description of the parameter.
 * - agrupacion: Group or category to which it belongs.
 * - titulo: Boolean indicator to determine if it is a title.
 * - estado: Status (active/inactive) of the parameter.
 * - pagina: Associated page.
 * - idPadre: Identifier of the parent parameter, if any.
 */
export interface Padre {
  idParametro: number;
  idioma: string;
  texto: string;
  link: string;
  archivoUrl: string;
  descripcion: string;
  agrupacion: string;
  titulo: boolean;
  estado: boolean;
  pagina: string;
  idPadre: number | null;
}

/**
 * ParametersData
 *
 * Spanish:
 * Define la estructura de los datos de parámetros. Incluye todos los campos de la entidad "Padre" junto con
 * la propiedad adicional "padre", que puede contener información del parámetro padre asociado.
 *
 * English:
 * Defines the structure for parameters data. It includes all the fields from the "Padre" entity along with
 * an additional "padre" property that may contain information about the associated parent parameter.
 */
export interface ParametersData {
  idParametro: number;
  idioma: string;
  texto: string;
  link: string;
  archivoUrl: string;
  descripcion: string;
  agrupacion: string;
  titulo: boolean;
  estado: boolean;
  pagina: string;
  idPadre: number | null;
  padre: Padre | null;
}
