import { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { getPersisted, savePersistense } from './Persistence/data';

const STORAGE_KEY = 'tk-order';

type State = Record<string, any> | null;

type OrderContextType = {
  data: State;
  setData: Dispatch<SetStateAction<State>>;
};

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

interface OrderProviderProps {
  children: ReactNode | ReactNode[];
}

export function OrderProvider({ children }: OrderProviderProps): JSX.Element {
  const [data, setData] = useState<State>(() => {
    const cachedData = getPersisted(STORAGE_KEY);
    return cachedData;
  });

  useEffect(() => {
    if (data !== null) {
      savePersistense(data, STORAGE_KEY);
    }
  }, [data]);

  return (
    <OrderContext.Provider value={{ data, setData }}>
      {children}
    </OrderContext.Provider>
  );
}