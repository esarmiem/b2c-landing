import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getPersisted, savePersistense } from "./Persistence/data";
import { GlobalData } from "@/TravelCore/Utils/interfaces/context.ts";

// Clave de almacenamiento para persistencia en localStorage.
// Storage key for persistence in localStorage.
const STORAGE_KEY = "tk-data";

// Definición del estado, que puede ser GlobalData o null.
// Definition of the state, which can be GlobalData or null.
type State = GlobalData | null;

// Definición del tipo del contexto que provee el estado y la función para actualizarlo.
// Definition of the context type that provides the state and the function to update it.
type DataContextType = {
  data: State;
  setData: Dispatch<SetStateAction<State>>;
};

// Creación del contexto con un valor inicial undefined.
// Create the context with an initial value of undefined.
export const DataContext = createContext<DataContextType | undefined>(
  undefined,
);

// Definición de las propiedades del proveedor del contexto.
// Definition of the context provider's props.
interface DataProviderProps {
  children: ReactNode | ReactNode[];
}
/**
 * DataProvider
 *
 * Spanish:
 * Componente proveedor del contexto de datos. Inicializa el estado utilizando datos persistidos
 * a través de la función getPersisted y guarda cualquier cambio en el estado en el almacenamiento
 * usando savePersistense. Esto permite que los componentes hijos accedan y actualicen el estado global.
 *
 * English:
 * Data context provider component. It initializes the state using persisted data via the getPersisted
 * function and saves any state changes to storage using savePersistense. This allows child components
 * to access and update the global state.
 *
 * @param {DataProviderProps} props - Propiedades del componente que incluyen los elementos hijos.
 *                                    / Component properties including children.
 * @returns {JSX.Element} Un elemento JSX que envuelve a los componentes hijos con el contexto.
 *                        / A JSX element wrapping child components with the context.
 */

export function DataProvider({ children }: DataProviderProps): JSX.Element {
  // Inicializa el estado con datos persistidos (si existen) a partir de STORAGE_KEY.
  // Initializes the state with persisted data (if available) from STORAGE_KEY.
  const [data, setData] = useState<State>(() => {
    const cachedData = getPersisted(STORAGE_KEY) as GlobalData | null;
    return cachedData;
  });

  // Guarda en el almacenamiento cualquier cambio en el estado.
  // Saves any changes in the state to storage.
  useEffect(() => {
    if (data !== null) {
      savePersistense(data, STORAGE_KEY);
    }
  }, [data]);

  // Retorna el proveedor del contexto que envuelve a los componentes hijos.
  // Returns the context provider wrapping the child components.
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}
