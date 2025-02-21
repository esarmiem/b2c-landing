import { useContext } from "react";
import { SessionContext } from "../ContextData/Session.tsx";

/**
 * useSession
 *
 * Spanish:
 * Hook personalizado para acceder al contexto de la sesión. Utiliza useContext para consumir el SessionContext,
 * facilitando el acceso a los datos globales de la sesión en la aplicación.
 *
 * English:
 * Custom hook to access the session context. It uses useContext to consume the SessionContext,
 * providing an easy way to access the global session data throughout the application.
 *
 * @returns {SessionContextType | undefined} El valor actual del SessionContext o undefined si no está disponible.
 *                                            / The current value of the SessionContext or undefined if not available.
 */
const useSession = () => useContext(SessionContext);

export default useSession;
