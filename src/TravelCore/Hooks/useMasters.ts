import { useContext } from "react";
import { MasterContext } from "../ContextData/Masters.tsx";

/**
 * useMasters
 *
 * Spanish:
 * Hook personalizado para acceder al contexto MasterContext. Utiliza useContext para consumir el contexto definido en MasterContext,
 * permitiendo un acceso sencillo a los datos globales administrados por dicho contexto.
 *
 * English:
 * Custom hook to access the MasterContext. It uses useContext to consume the context defined in MasterContext,
 * providing a simple way to access the global data managed by this context.
 *
 * @returns {MasterContextType | undefined} El valor actual del contexto MasterContext o undefined si el contexto no está disponible.
 *                                            / The current value of MasterContext or undefined if the context is not available.
 */
const useMasters = () => useContext(MasterContext);

export default useMasters;
