import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { getPersisted, savePersistense } from './Persistence/data';
import { dataOrder } from "@/TravelCore/Utils/interfaces/Order.ts";

const STORAGE_KEY = 'tk-data';

type State = dataOrder | null;

type DataContextType = {
  data: State;
  setData: Dispatch<SetStateAction<State>>;
};

export const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode | ReactNode[];
}

export function DataProvider({ children }: DataProviderProps): JSX.Element {
  const [data, setData] = useState<State>(() => {
    const cachedData = getPersisted(STORAGE_KEY) as dataOrder | null;
    return cachedData;
  });

  useEffect(() => {
    if (data !== null) {
      savePersistense(data, STORAGE_KEY);
    }
  }, [data]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}