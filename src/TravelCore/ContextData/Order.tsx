import { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { getPersisted, savePersistense } from './Persistence/data';
import { ResponseData } from "@/TravelCore/Utils/interfaces/Order.ts";

const STORAGE_KEY = 'tk-order';

type State = ResponseData | null;

type OrderContextType = {
  order: State;
  setOrder: Dispatch<SetStateAction<State>>;
};

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

interface OrderProviderProps {
  children: ReactNode | ReactNode[];
}

export function OrderProvider({ children }: OrderProviderProps): JSX.Element {
  const [order, setOrder] = useState<State>(() => {
    const cachedData = getPersisted(STORAGE_KEY) as ResponseData | null;
    return cachedData;
  });

  useEffect(() => {
    if (order !== null) {
      savePersistense(order, STORAGE_KEY);
    }
  }, [order]);

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
}