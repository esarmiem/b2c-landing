import { useContext } from "react";
import { UserPreferencesContext } from "../ContextData/UserPreferences";

/**
 * useUserPreferences
 *
 * Spanish:
 * Hook personalizado para acceder al contexto de las preferencias del usuario. Utiliza useContext para consumir el UserPreferencesContext,
 * facilitando el acceso a los datos de preferencias del usuario a lo largo de la aplicación.
 *
 * English:
 * Custom hook to access the user preferences context. It uses useContext to consume the UserPreferencesContext,
 * providing easy access to user preferences data throughout the application.
 *
 * @returns {UserPreferencesContextType | undefined} El valor actual del UserPreferencesContext o undefined si no está disponible.
 *                                                     / The current value of the UserPreferencesContext or undefined if not available.
 */
const useUserPreferences = () => useContext(UserPreferencesContext);

export default useUserPreferences;
