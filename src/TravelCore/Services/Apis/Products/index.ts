import {axiosHttp} from "../../../Utils/http.ts"
import {SERVICE_PRODUCTS} from "../../../Utils/constants.ts"

interface ProductsPregunta {
    idPregunta: number
    descripcion: string
    estaActivo: boolean
    tipoViaje: string
}

interface ProductsItems {
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

interface ProductsData {
    total: number
    page: number
    totalPages: number
    items: ProductsItems[]
    next: string | null
    prev: string | null
}

interface ApiResponse {
    data: ProductsData
    error: string | null
}

export const PRODUCTS_API = {
    getProducts: (isActive = ""): Promise<ApiResponse> => {
        return axiosHttp({
            path: `${SERVICE_PRODUCTS}${isActive}`,
            method: 'GET',
            session: null
        })
    },
}