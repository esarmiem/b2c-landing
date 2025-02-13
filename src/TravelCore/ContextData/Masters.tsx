import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState} from 'react'
import {getPersisted, savePersistense} from './Persistence/data.ts'
import {MASTER_CONST_STORAGE_KEYS} from "@/TravelCore/Utils/ConstStorageKeys.ts"
import {GenericItem, ApiResponse} from "@/TravelCore/Utils/interfaces/context.ts";

type StateKey = keyof typeof MASTER_CONST_STORAGE_KEYS
type State<T = GenericItem> = ApiResponse<T> | null;

// Tipo para el contexto usando las llaves definidas
type MasterContextType = {
  [K in StateKey]: {
    data: State<any>
    setData: Dispatch<SetStateAction<State<any>>>
  }
}

export const MasterContext = createContext<MasterContextType | undefined>(undefined)

interface MasterProviderProps {
  children: ReactNode | ReactNode[]
}

export function MasterProvider({children}: MasterProviderProps): JSX.Element {
  // Crear estados de forma dinámica
  const states = Object.entries(MASTER_CONST_STORAGE_KEYS).reduce((acc, [key, storageKey]) => {
    const [data, setData] = useState<State>(() => {
      // Verificar si ya existe en localStorage
      const cachedData = getPersisted(storageKey)
      return cachedData as State
    })

    useEffect(() => {
      if (data !== null) {
        savePersistense(data, storageKey)
      }
    }, [data])

    return {
      ...acc,
      [key]: {data, setData}
    }
  }, {} as MasterContextType)

  return (
    <MasterContext.Provider value={states}>
      {children}
    </MasterContext.Provider>
  )
}