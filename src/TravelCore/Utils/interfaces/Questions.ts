export interface QuestionItems {
  idPregunta: number
  descripcion: string
  estaActivo: boolean
  tipoViaje: string
}

export interface QuestionData {
  total: number
  page: number
  totalPages: number
  items: QuestionItems[]
  next: string | null
  prev: string | null
}