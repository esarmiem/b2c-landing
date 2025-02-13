export interface ArrivalsItems {
  idDestino: number
  descripcion: string
  codigo: number
  estaActivo: boolean
}

export interface ArrivalsData {
  total: number
  page: number
  totalPages: number
  items: ArrivalsItems[],
  next: string | null
  prev: string | null
}