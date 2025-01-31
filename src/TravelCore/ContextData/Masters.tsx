import {createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction} from 'react';
import {getPersisted, savePersistense} from './Persistence/data.ts';

const STORAGE_KEYS = {
  cities: 'tk-cities',
  arrivals: 'tk-arrivals',
  countries: 'tk-countries',
  documents: 'tk-documents',
  medicals: 'tk-medicals',
  order: 'tk-order',
  parameters: 'tk-parameters',
  products: 'tk-products',
  questions: 'tk-questions'
} as const;

type StateKey = keyof typeof STORAGE_KEYS;
type State = Record<string, any> | null;

// Tipo para el contexto usando las llaves definidas
type MasterContextType = {
  [K in StateKey]: {
    data: State;
    setData: Dispatch<SetStateAction<State>>;
  };
};

export const MasterContext = createContext<MasterContextType | undefined>(undefined);

interface MasterProviderProps {
  children: ReactNode | ReactNode[];
}

export function MasterProvider({children}: MasterProviderProps): JSX.Element {
  // Crear estados de forma dinámica
  const states = Object.entries(STORAGE_KEYS).reduce((acc, [key, storageKey]) => {
    const [data, setData] = useState<State>(() => {
      // Verificar si ya existe en localStorage
      const cachedData = getPersisted(storageKey);
      return cachedData;
    });

    useEffect(() => {
      if (data !== null) {
        savePersistense(data, storageKey);
      }
    }, [data]);

    return {
      ...acc,
      [key]: {data, setData}
    };
  }, {} as MasterContextType);

  return (
    <MasterContext.Provider value={states}>
      {children}
    </MasterContext.Provider>
  );
}