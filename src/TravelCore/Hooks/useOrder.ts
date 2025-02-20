import { useContext } from "react";
import { OrderContext } from "../ContextData/Order.tsx";

/**
 * useOrder
 *
 * Spanish:
 * Hook personalizado para acceder al contexto de Order. Este hook utiliza useContext para consumir el OrderContext,
 * proporcionando un acceso directo y sencillo a los datos del pedido en el contexto global.
 *
 * English:
 * Custom hook to access the Order context. This hook uses useContext to consume the OrderContext,
 * providing direct and easy access to the order data in the global context.
 *
 * @returns {OrderContextType | undefined} El valor actual del contexto Order o undefined si no se ha definido.
 *                                           / The current value of the Order context or undefined if it is not set.
 */
const useOrder = () => useContext(OrderContext);

export default useOrder;
