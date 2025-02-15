import {dataOrder, Data} from "@/TravelCore/Utils/interfaces/Order.ts";

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
  payloadOrder: dataOrder
  responseOrder: Data
}

