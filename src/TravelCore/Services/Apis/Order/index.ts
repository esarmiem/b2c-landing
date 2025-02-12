import {axiosHttp} from "../../../Utils/http.ts"
import {SERVICE_CHECK_PREORDER_ISL, SERVICE_GET_ORDER_PRICE_EDAD,} from "../../../Utils/constants.ts"
import {GET_TOKEN} from "../../../Utils/storage.ts"

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

export interface Plan {
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

interface dataOrder {
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

interface ApiResponse {
  data: ResponseData;
  error: string | null;
}

interface dataPreorder {
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

interface CheckPreorderISLResponse {
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

interface ApiCheckPreOrderResponse {
  data: CheckPreorderISLResponse;
  error: string | null;
}

export const ASSISTANCE_API = {
  getOrderPriceEdad: (data: dataOrder): Promise<ApiResponse> => {
    return axiosHttp({
      path: `${SERVICE_GET_ORDER_PRICE_EDAD}`,
      method: 'POST',
      data: JSON.stringify(data),
      session: {token: GET_TOKEN}
    })
  },
  // getProductUpdates: async (productCode: string) => {
  //   const url = `${ISL_APP_SERVICE_UPGRADES_PRODUCTION}`;
  //   const token = await getISLToken();
  //   const data = {
  //     request: 'get_upgrade',
  //     token: token,
  //     id_plan: productCode,
  //     language: 'spa',
  //   };
  //
  //   try {
  //     const response = await axiosHttp({
  //       method: 'GET',
  //       path: url,
  //       data: JSON.stringify(data),
  //       customConfig: {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching product updates:', error);
  //     throw error;
  //   }
  // },
  checkPreorderISL: (data: dataPreorder): Promise<ApiCheckPreOrderResponse> => {
    return axiosHttp({
      path: `${SERVICE_CHECK_PREORDER_ISL}`,
      method: 'POST',
      data: JSON.stringify(data),
      session: {token: GET_TOKEN}
    })
  }
}