export interface DocumentTypeItems {
  idTipoDocumento: number
  abreviacion: string
  nombre: string
  estaActivo: boolean
}

export interface DocumentTypeData {
  total: number
  page: number
  totalPages: number
  items: DocumentTypeItems[]
  next: string | null
  prev: string | null
}