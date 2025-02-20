import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn - Combina nombres de clases utilizando clsx y tailwind-merge.
 *
 * Spanish:
 * Esta función recibe una cantidad variable de argumentos que representan valores de clase CSS.
 * Primero, utiliza la librería 'clsx' para procesar y concatenar condicionalmente dichos valores en una cadena.
 * Luego, emplea 'twMerge' de 'tailwind-merge' para fusionar las clases, resolviendo cualquier conflicto específico de Tailwind CSS.
 *
 * English:
 * This function takes a variable number of arguments representing CSS class values.
 * It first uses the 'clsx' library to process and conditionally concatenate these values into a string.
 * Then, it employs 'twMerge' from 'tailwind-merge' to merge the classes, resolving any Tailwind CSS specific conflicts.
 *
 * @param {...ClassValue} inputs - Los valores de clase que se desean combinar. / The class values to be combined.
 * @returns {string} Una cadena con las clases fusionadas. / A string with the merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  // Combina los valores de clase utilizando clsx y luego los fusiona con twMerge.
  // Combines class values using clsx and then merges them with twMerge.

  return twMerge(clsx(inputs));
}
