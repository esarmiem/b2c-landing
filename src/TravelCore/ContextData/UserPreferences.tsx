import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { getPersisted, savePersistense } from "./Persistence/data";
import {
  ApiResponse,
  GenericItem,
} from "@/TravelCore/Utils/interfaces/context.ts";

// STORAGE_KEY: Clave utilizada para almacenar las preferencias del usuario en localStorage.
// STORAGE_KEY: Key used to store user preferences in localStorage.
const STORAGE_KEY = "user-preferences";

// Preferences: Define el tipo para las preferencias del usuario, utilizando ApiResponse con un parámetro genérico.
// Preferences: Defines the type for user preferences, using ApiResponse with a generic parameter.
type Preferences<T = GenericItem> = ApiResponse<T> | null;

// UserPreferencesContextType: Define el tipo del contexto para las preferencias del usuario,
// incluyendo el estado actual y la función para actualizarlo.
// UserPreferencesContextType: Defines the context type for user preferences,
// including the current state and the function to update it.
type UserPreferencesContextType = {
  preferences: Preferences;
  setPreferences: Dispatch<SetStateAction<Preferences>>;
};

// Creación del contexto para las preferencias del usuario, inicialmente undefined.
// Creating the user preferences context, initially undefined.
export const UserPreferencesContext = createContext<
  UserPreferencesContextType | undefined
>(undefined);

// UserPreferencesProviderProps: Define las propiedades del proveedor de contexto, que incluyen los elementos hijos.
// UserPreferencesProviderProps: Defines the props for the context provider, which include child elements.
interface UserPreferencesProviderProps {
  children: ReactNode | ReactNode[];
}

/**
 * UserPreferencesProvider
 *
 * Spanish:
 * Componente proveedor de contexto para las preferencias del usuario. Este componente inicializa el estado de las preferencias
 * utilizando datos persistidos en localStorage mediante la función getPersisted. Cada vez que las preferencias cambian, se actualizan
 * en localStorage a través de savePersistense. Esto permite que los componentes hijos accedan y actualicen las preferencias de manera centralizada.
 *
 * English:
 * Context provider component for user preferences. This component initializes the preferences state using persisted data from
 * localStorage via the getPersisted function. Whenever the preferences change, they are updated in localStorage using savePersistense.
 * This allows child components to access and update user preferences centrally.
 *
 * @param {UserPreferencesProviderProps} props - Propiedades del componente que incluyen los elementos hijos (children).
 *                                                 / Component properties including the child elements.
 * @returns {JSX.Element} Un elemento JSX que provee el contexto de las preferencias del usuario a los componentes hijos.
 *                        / A JSX element that provides the user preferences context to child components.
 */
export function UserPreferencesProvider({
  children,
}: UserPreferencesProviderProps): JSX.Element {
  // Inicializa el estado de las preferencias utilizando datos persistidos (si existen) desde localStorage.
  // Initializes the preferences state using persisted data (if available) from localStorage.
  const [preferences, setPreferences] = useState<Preferences>(() => {
    const cachedPreferences = getPersisted(STORAGE_KEY);
    return cachedPreferences;
  });
  // Guarda en localStorage cada vez que las preferencias cambian.
  // Saves to localStorage whenever the preferences change.
  useEffect(() => {
    if (preferences) {
      savePersistense(preferences, STORAGE_KEY);
    }
  }, [preferences]);
  // Provee el contexto de preferencias del usuario a los componentes hijos.
  // Provides the user preferences context to child components.
  return (
    <UserPreferencesContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
}
