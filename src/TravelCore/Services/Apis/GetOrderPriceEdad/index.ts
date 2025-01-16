import {axiosHttp} from "../../../Utils/http.ts"
import {SERVICE_GET_ORDER_PRICE_EDAD} from "../../../Utils/constants.ts"

interface DescripcionDescuentos {
    valorDescuento: string;
    valorTotal: number;
    porcentaje: string;
}

interface Cobertura {
    valor_spa: string;
    valor_eng: string;
    id_benefit: string;
    name: string;
    language_id: string;
    extended_info: string;
}

interface Condiciones {
    id: number;
    description: string;
    name: string;
    terms: string;
}

interface Plan {
    Id: number;
    IdPlan: number;
    Pregunta: string;
    Categoria: string;
    TipoViaje: string;
    nombre: string;
    ValorCobertura: string;
    DescripcionDescuentosDolares: DescripcionDescuentos;
    DescripcionDescuentosPesos: DescripcionDescuentos;
    Valor: string;
    ValorPesos: string;
    ValorPax: string;
    ValorPaxPesos: string;
    upgrade: any[];
    cobertura: Cobertura[];
    Condiciones: Condiciones;
}

interface ResponseData {
    planes: Plan[];
    idProspecto: number;
}

interface ApiResponse {
    data: ResponseData;
    error: string | null;
}

interface Payload {
    cantidadPax: number
    destino: number
    edades: string
    email: string
    idUser: string
    lenguaje: string
    llegada: string
    numeroPregunta: number
    pais: string
    salida: string
    telefono: string
}

export const GET_ORDER_PRICE_EDAD = {
    getOrderPriceEdad: (payload: Payload): Promise<ApiResponse> => {
        return axiosHttp({
            path: `${SERVICE_GET_ORDER_PRICE_EDAD}`,
            method: 'POST',
            data: JSON.stringify(payload),
            session: null
        })
    },
}