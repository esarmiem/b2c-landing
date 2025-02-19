import { useContext } from "react";
import { DataContext } from "@/TravelCore/ContextData/Data.tsx";

/**
 * useData
 *
 * Spanish:
 * Hook personalizado para acceder al DataContext. Este hook utiliza useContext para consumir
 * el contexto de datos, proporcionando una forma sencilla de acceder a la información global.
 *
 * English:
 * Custom hook to access DataContext. This hook uses useContext to consume
 * the data context, providing an easy way to access global information.
 *
 * @returns {DataContextType | undefined} El valor del contexto o undefined si el contexto no está disponible.
 *                                        / The context value or undefined if the context is not available.
 */
const useData = () => useContext(DataContext);

export default useData;
