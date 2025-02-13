export interface MedicalConditionsItems {
  idCondicionMedica: number
  descripcion: string
  estaActivo: boolean
}

export interface MedicalConditionsData {
  total: number
  page: number
  totalPages: number
  items: MedicalConditionsItems[]
  next: string | null,
  prev: string | null
}