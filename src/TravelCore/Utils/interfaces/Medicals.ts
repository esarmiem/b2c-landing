/**
 * MedicalConditionsItems
 *
 * Spanish:
 * Define la estructura de cada elemento que representa una condición médica.
 * Incluye el identificador de la condición, su descripción y un indicador de si está activo.
 *
 * English:
 * Defines the structure of each item representing a medical condition.
 * It includes the condition's identifier, its description, and a flag indicating whether it is active.
 */
export interface MedicalConditionsItems {
  idCondicionMedica: number;
  descripcion: string;
  estaActivo: boolean;
}

/**
 * MedicalConditionsData
 *
 * Spanish:
 * Define la estructura de los datos relacionados con las condiciones médicas.
 * Este objeto contiene información de paginación (total, página actual, total de páginas) y una lista
 * de elementos de condiciones médicas. Además, incluye enlaces a la página siguiente y anterior.
 *
 * English:
 * Defines the structure for data related to medical conditions.
 * This object contains pagination details (total items, current page, total pages) and a list
 * of medical condition items. It also includes links to the next and previous pages.
 */
export interface MedicalConditionsData {
  total: number;
  page: number;
  totalPages: number;
  items: MedicalConditionsItems[];
  next: string | null;
  prev: string | null;
}
