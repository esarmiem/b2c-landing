import type { MASTER_CONST_STORAGE_KEYS } from '@/TravelCore/Utils/ConstStorageKeys.ts'
import type { Data, dataOrder } from '@/TravelCore/Utils/interfaces/Order.ts'
import type { Dispatch, SetStateAction } from 'react'

export interface GenericItem {
  [key: string]: any
}

export interface ApiResponse<T = GenericItem> {
  total: number
  page: number
  totalPages: number
  items: T[]
  next: number | null
  prev: number | null
}

export interface StorageData<T = any> {
  data: T
  timestamp: number
  version: string
}

export interface GlobalData {
  payloadOrder?: Partial<dataOrder>
  responseOrder?: Data | null
}

//type for MasterContext
export type StateKey = keyof typeof MASTER_CONST_STORAGE_KEYS
export type State<T = GenericItem> = ApiResponse<T> | null

export type MasterContextType = {
  [K in StateKey]: {
    data: State<any> | null
    setData: Dispatch<SetStateAction<State<any>>>
  }
}
