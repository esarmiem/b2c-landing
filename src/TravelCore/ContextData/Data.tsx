import type { GlobalData } from '@/TravelCore/Utils/interfaces/context.ts'
import { type Dispatch, type ReactNode, type SetStateAction, createContext, useEffect, useState } from 'react'
import { getPersisted, savePersistense } from './Persistence/data'

const STORAGE_KEY = 'tk-data'

type State = GlobalData | null

type DataContextType = {
  data: State
  setData: Dispatch<SetStateAction<State>>
}

export const DataContext = createContext<DataContextType | undefined>(undefined)

interface DataProviderProps {
  children: ReactNode | ReactNode[]
}

export function DataProvider({ children }: DataProviderProps): JSX.Element {
  const [data, setData] = useState<State>(() => {
    const cachedData = getPersisted(STORAGE_KEY) as GlobalData | null
    return cachedData
  })

  useEffect(() => {
    if (data !== null) {
      savePersistense(data, STORAGE_KEY)
    }
  }, [data])

  return <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>
}
