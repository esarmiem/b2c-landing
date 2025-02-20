//Order Response
export interface DescripcionDescuentos {
  valorDescuento: string;
  valorTotal: number;
  porcentaje: string;
}

export interface Cobertura {
  valor_spa: string;
  valor_eng: string;
  id_benefit: string;
  name: string;
  language_id: string;
  extended_info: string;
}

export interface Condiciones {
  id: number;
  description: string;
  name: string;
  terms: string;
}

export interface Pax {
  apellidos: string
  apellidosContactoEmergencia: string
  document: string
  edad: number
  email: string
  idNacionalidad: number
  idPais: number
  idTipoDocumento: number
  medical: string
  nacimientos: string
  nombre: string
  nombresContactoEmergencia: string
  sexo: any
  telefono1ContactoEmergencia: string
  telefonos: string
}

export interface PaxForm {
  firstName: string
  lastName: string
  documentType: string
  documentNumber: string
  birthdate: string
  age: number
  gender: any
  nationality: number
  residenceCountry: number
  email: string
  phone: string
  countryCode: string
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
  viewType?: "list" | "grid";
}
export interface Data {
  planes: Plan[];
  idProspecto: number;
}

export interface ResponseData {
  data: Data;
  error: string | null;
}
//Order Payload
export interface dataOrder {
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
//Upgrades
interface Upgrade {
  type_raider: string
  rd_calc_type: string
  id_raider: string
  cost_raider: string
  name_raider: string
  value_raider: string
}
//Order Isl Payload
export interface dataIslOrder {
  ValorTotalSinDescuentoDolares: number
  ValorTotalSinDescuentoPesos: number
  consideracionesgenerales: string
  detalleUpgrades: Upgrade[]
  emailcontacto: string
  fechallegada: string
  fechasalida: string
  idCliente: number
  idDestino : number
  idOrigen: number
  idProducto: number
  idProspecto: number
  idUser: number
  idplan: number
  moneda: number
  nombrecontacto: number
  numeroViajeros: number
  paisdestino: number
  paisorigen: number
  pax: Pax[]
  referencia:string
  telefonocontacto: string
  totalUpgradesPesos: number
  totalVenta: number
  totalVentaDolares: number
  totalVentaPesos: number
  upgrades: string
  valorProductoDolares: string
  valorProductoPesos: string
  valorViajeroDolares: string
  valorViajeroPesos: string
}


//PreOrder Payload
export interface dataPreorder {
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
//PreOrder Response
export interface CheckPreorderISLResponse {
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