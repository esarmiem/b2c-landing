import {
  createContext,
  useEffect,
  useState,
  ReactElement,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { getPersistedSession, saveSession } from "./Persistence/session.ts";

/**
 * SessionState
 *
 * Spanish:
 * Define el tipo para el estado de la sesión, que es un objeto con claves y valores de tipo string.
 *
 * English:
 * Defines the type for the session state, which is an object with string keys and values.
 */
type SessionState = Record<string, string>;

/**
 * SessionContextType
 *
 * Spanish:
 * Define el tipo para el contexto de la sesión. Incluye el estado de la sesión, una función para actualizarlo
 * y opcionalmente los tokens 'token' y 'token_isl'.
 *
 * English:
 * Defines the type for the session context. It includes the session state, a function to update it,
 * and optionally the tokens 'token' and 'token_isl'.
 */
interface SessionContextType {
  session: SessionState;
  setSession: Dispatch<SetStateAction<SessionState>>;
  token?: string;
  token_isl?: string;
}

/**
 * SessionContext
 *
 * Spanish:
 * Crea el contexto para la sesión con un valor inicial undefined.
 *
 * English:
 * Creates the session context with an initial value of undefined.
 */
export const SessionContext = createContext<SessionContextType | undefined>(
  undefined,
);

/**
 * SessionProviderProps
 *
 * Spanish:
 * Define las propiedades para el componente proveedor de sesión, que requiere elementos hijos (children).
 *
 * English:
 * Defines the props for the session provider component, which requires child elements.
 */
interface SessionProviderProps {
  children: ReactNode | ReactNode[];
}

/**
 * SessionProvider
 *
 * Spanish:
 * Componente proveedor de contexto para la sesión del usuario. Este componente utiliza el estado persistido
 * en sessionStorage a través de la función getPersistedSession para inicializar el estado de la sesión y guarda
 * cualquier cambio en sessionStorage usando saveSession. Además, extrae y provee los valores 'token' y 'token_isl'
 * directamente del estado de la sesión.
 *
 * English:
 * Context provider component for the user session. This component initializes the session state using the persisted data
 * from sessionStorage via getPersistedSession and saves any changes to sessionStorage using saveSession. Additionally,
 * it extracts and provides the 'token' and 'token_isl' values directly from the session state.
 *
 * @param {SessionProviderProps} props - Component properties including the child elements.
 * @returns {ReactElement} A React element that provides the session context to its children.
 */
export function SessionProvider({
  children,
}: SessionProviderProps): ReactElement {
  // Inicializa el estado de la sesión utilizando los datos persistidos.
  // Initialize the session state using the persisted data.
  const [session, setSession] = useState<SessionState>(getPersistedSession);
  // Guarda en sessionStorage cada vez que el estado de la sesión cambia.
  // Save the session state to sessionStorage whenever it changes.
  useEffect(() => {
    saveSession(session);
  }, [session]);
  // Proporciona el contexto de sesión a los componentes hijos.
  // Provide the session context to child components.
  return (
    <SessionContext.Provider
      value={{
        session,
        setSession,
        token: session.token,
        token_isl: session.token_isl,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
