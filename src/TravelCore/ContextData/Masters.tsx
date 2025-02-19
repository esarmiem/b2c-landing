import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getPersisted, savePersistense } from "./Persistence/data.ts";
import { MASTER_CONST_STORAGE_KEYS } from "@/TravelCore/Utils/ConstStorageKeys.ts";
import {
  GenericItem,
  ApiResponse,
} from "@/TravelCore/Utils/interfaces/context.ts";

type StateKey = keyof typeof MASTER_CONST_STORAGE_KEYS;
type State<T = GenericItem> = ApiResponse<T> | null;

// Tipo para el contexto usando las llaves definidas
type MasterContextType = {
  [K in StateKey]: {
    data: State<any>;
    setData: Dispatch<SetStateAction<State<any>>>;
  };
};

// MasterContext: contexto global para almacenar múltiples estados asociados a claves de almacenamiento.
// MasterContext: global context for storing multiple states associated with storage keys.
export const MasterContext = createContext<MasterContextType | undefined>(
  undefined,
);

interface MasterProviderProps {
  children: ReactNode | ReactNode[];
}

/**
 * MasterProvider
 *
 * Spanish:
 * Proveedor de contexto que crea y gestiona múltiples estados de manera dinámica.
 * Se basa en las claves definidas en MASTER_CONST_STORAGE_KEYS. Para cada clave, se inicializa
 * un estado utilizando los datos persistidos en localStorage (si existen) a través de la función getPersisted.
 * Además, se utiliza useEffect para guardar cualquier cambio en el estado en localStorage mediante savePersistense.
 * Los estados se agrupan en un objeto que se proporciona a todos los componentes hijos a través del contexto MasterContext.
 *
 * English:
 * Context provider that dynamically creates and manages multiple states.
 * It is based on the keys defined in MASTER_CONST_STORAGE_KEYS. For each key, a state is initialized using
 * persisted data from localStorage (if available) via the getPersisted function.
 * Additionally, useEffect is used to save any changes in the state to localStorage using savePersistense.
 * The states are grouped into an object that is provided to all child components via the MasterContext.
 *
 * @param {MasterProviderProps} props - Propiedades del componente que incluyen los elementos hijos.
 *                                      / Component properties including children.
 * @returns {JSX.Element} Un elemento JSX que envuelve a los componentes hijos con el contexto.
 *                        / A JSX element wrapping child components with the context.
 */
export function MasterProvider({ children }: MasterProviderProps): JSX.Element {
  // Crear estados de forma dinámica a partir de las claves definidas en MASTER_CONST_STORAGE_KEYS.
  // Dynamically create states based on the keys defined in MASTER_CONST_STORAGE_KEYS.
  // Crear estados de forma dinámica
  const states = Object.entries(MASTER_CONST_STORAGE_KEYS).reduce(
    (acc, [key, storageKey]) => {
      // Inicializar el estado para cada clave utilizando getPersisted para recuperar datos del localStorage.
      // Initialize the state for each key using getPersisted to retrieve data from localStorage.
      const [data, setData] = useState<State>(() => {
        // Verificar si ya existe en localStorage.
        // Check if data exists in localStorage.
        const cachedData = getPersisted(storageKey);
        return cachedData as State;
      });

      // Utilizar useEffect para guardar en localStorage cualquier cambio en el estado.
      // Use useEffect to save any changes in the state to localStorage.
      useEffect(() => {
        if (data !== null) {
          savePersistense(data, storageKey);
        }
      }, [data]);

      // Agregar el estado y su función de actualización al acumulador.
      // Add the state and its update function to the accumulator.
      return {
        ...acc,
        [key]: { data, setData },
      };
    },
    {} as MasterContextType,
  );
  // Proveer el objeto de estados a través del contexto MasterContext a los componentes hijos.
  // Provide the states object via MasterContext to the child components.
  return (
    <MasterContext.Provider value={states}>{children}</MasterContext.Provider>
  );
}
