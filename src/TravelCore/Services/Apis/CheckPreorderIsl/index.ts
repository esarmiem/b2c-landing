import {axiosHttp} from "../../../Utils/http.ts"
import {SERVICE_CHECK_PREORDER_ISL} from "../../../Utils/constants.ts"

interface Payload {
    consideracionesgenerales: string
    correoCliente: string
    direccionCliente: string
    edad: string
    emailcontacto: string
    fechallegada: string
    fechasalida: string
    idCiudadCliente: number
    idPaisCliente: number
    idProspecto: number
    idTipoDocumentoCliente: number
    idUser: string
    idplan: number
    informacionAdicionalCliente: string
    moneda: string
    nombreCliente: string
    nombrecontacto: string
    numeroDocumentoCliente: string
    paisdestino: number
    paisorigen: string
    referencia: string
    telefonoCliente: number
    telefonocontacto: string
    upgrades: string
}

interface ApiResponse {
    "mensaje": {
        "": string
        status: string,
        valor: string
        documento: string
        referencia: string
        El_valor_de_cambio_fue_ajustado_a: string
    },
    idCliente: number
}

export const CHECK_PREORDER_ISL_API = {
    checkPreorderISL: (payload: Payload): Promise<ApiResponse> => {
        return axiosHttp({
            path: `${SERVICE_CHECK_PREORDER_ISL}`,
            method: 'POST',
            data: JSON.stringify(payload),
            session: null
        })
    },
}