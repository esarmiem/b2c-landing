export interface Padre {
  idParametro: number
  idioma: string
  texto: string
  link: string
  archivoUrl: string
  descripcion: string
  agrupacion: string
  titulo: boolean
  estado: boolean
  pagina: string
  idPadre: number | null
}

export interface ParametersData {
  idParametro: number
  idioma: string
  texto: string
  link: string
  archivoUrl: string
  descripcion: string
  agrupacion: string
  titulo: boolean
  estado: boolean
  pagina: string
  idPadre: number | null
  padre: Padre | null
}