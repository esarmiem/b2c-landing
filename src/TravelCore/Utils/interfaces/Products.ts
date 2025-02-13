export interface ProductsPregunta {
  idPregunta: number
  descripcion: string
  estaActivo: boolean
  tipoViaje: string
}

export interface ProductsItems {
  idProducto: number
  nombre: string
  descripcionInterna: string
  tipo: string
  idPregunta: number
  estaActivo: boolean
  porcentajeDescuento: string
  tiempoMinimo: string
  tiempoMaximo: string
  pregunta: ProductsPregunta
}

export interface ProductsData {
  total: number
  page: number
  totalPages: number
  items: ProductsItems[]
  next: string | null
  prev: string | null
}