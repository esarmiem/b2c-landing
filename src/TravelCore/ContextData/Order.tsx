import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { getPersisted, savePersistense } from "./Persistence/data";
import { ResponseData } from "@/TravelCore/Utils/interfaces/Order.ts";

// Clave de almacenamiento para el pedido en localStorage.
// Storage key for the order in localStorage.
const STORAGE_KEY = "tk-order";

// Definición del tipo de estado para el pedido.
// Definition of the state type for the order.
type State = ResponseData | null;

// Definición del tipo de contexto para el pedido, que incluye el estado y la función para actualizarlo.
// Definition of the order context type, including the state and the update function.
type OrderContextType = {
  order: State;
  setOrder: Dispatch<SetStateAction<State>>;
};

// Creación del contexto para el pedido con un valor inicial undefined.
// Creating the order context with an initial undefined value.
export const OrderContext = createContext<OrderContextType | undefined>(
  undefined,
);

interface OrderProviderProps {
  children: ReactNode | ReactNode[];
}

/**
 * OrderProvider
 *
 * Spanish:
 * Componente proveedor de contexto para el pedido. Inicializa el estado del pedido utilizando datos
 * persistidos en localStorage a través de la función getPersisted y, cada vez que el estado cambia, se guarda
 * en localStorage usando savePersistense. Esto permite que los componentes hijos accedan y actualicen el estado
 * del pedido de forma centralizada.
 *
 * English:
 * Context provider component for the order. It initializes the order state using persisted data
 * from localStorage via the getPersisted function and, whenever the state changes, it is saved
 * in localStorage using savePersistense. This allows child components to centrally access and update the order state.
 *
 * @param {OrderProviderProps} props - Propiedades del componente, incluyendo los elementos hijos.
 *                                     / Component properties including children.
 * @returns {JSX.Element} Un elemento JSX que provee el contexto del pedido a los componentes hijos.
 *                        / A JSX element providing the order context to child components.
 */
export function OrderProvider({ children }: OrderProviderProps): JSX.Element {
  // Inicializa el estado del pedido con datos persistidos (si existen) usando STORAGE_KEY.
  // Initialize the order state with persisted data (if available) using STORAGE_KEY.
  const [order, setOrder] = useState<State>(() => {
    const cachedData = getPersisted(STORAGE_KEY) as ResponseData | null;
    return cachedData;
  });

  // Guarda en localStorage cada vez que el estado del pedido cambia.
  // Save to localStorage whenever the order state changes.
  useEffect(() => {
    if (order !== null) {
      savePersistense(order, STORAGE_KEY);
    }
  }, [order]);

  // Provee el contexto del pedido a los componentes hijos.
  // Provide the order context to child components.
  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
