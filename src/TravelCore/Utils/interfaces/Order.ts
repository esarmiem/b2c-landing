//Order Response
/**
 * DescripcionDescuentos
 *
 * Spanish:
 * Define la estructura de los descuentos en una orden. Incluye el valor del descuento, el valor total y el porcentaje aplicado.
 *
 * English:
 * Defines the structure for discounts in an order. It includes the discount value, the total value, and the applied percentage.
 */

export interface DescripcionDescuentos {
  valorDescuento: string
  valorTotal: number
  porcentaje: string
}

/**
 * Cobertura
 *
 * Spanish:
 * Representa la información de cobertura de un plan. Contiene valores en español e inglés,
 * el identificador del beneficio, el nombre, el identificador de idioma y información extendida.
 *
 * English:
 * Represents the coverage information for a plan. It includes values in Spanish and English,
 * the benefit identifier, name, language identifier, and extended information.
 */
export interface Cobertura {
  valor_spa: string
  valor_eng: string
  id_benefit: string
  name: string
  language_id: string
  extended_info: string
}

/**
 * Condiciones
 *
 * Spanish:
 * Define las condiciones asociadas a un plan, incluyendo su identificador, descripción, nombre y términos.
 *
 * English:
 * Defines the conditions associated with a plan, including its identifier, description, name, and terms.
 */
export interface Condiciones {
  id: number
  description: string
  name: string
  terms: string
}

export interface Upgrade {
  type_raider: string
  rd_calc_type: string
  id_raider: string
  cost_raider: string
  name_raider: string
  value_raider: string
}

export interface Pax {
  apellidos?: string
  apellidosContactoEmergencia?: string
  document?: string
  edad?: number
  email?: string
  idNacionalidad?: number
  idPais?: number
  idTipoDocumento?: number
  medical?: string
  nacimientos?: string
  nombre?: string
  nombresContactoEmergencia?: string
  sexo?: any
  telefono1ContactoEmergencia?: string
  telefonos?: string
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
  billingCountry: string // Propiedad añadida.
  billingCity: string // Propiedad añadida.
  address: string // Propiedad añadida.
  additional: string // Propiedad añadida.
}

export interface EmergencyContactType {
  firstName: string
  lastName: string
  phone1: string
  phone2: string
  indicative1: string
  indicative2: string
}

export interface Billing {
  additional: string
  address: string
  billingCity: string
  billingCountry: string
  countryCode: string
  documentNumber: string
  documentType: string
  email: string
  firstName: string
  lastName: string
  phone: string
}

export interface EpaycoData {
  [key: string]: string | number | boolean
  epaycoName: string
  epaycoDescription: string
  epaycoInvoice: string
  epaycoCurrency: string
  epaycoAmount: string
  epaycoLang: string
  epaycoExternal: string
  epaycoConfirmation: string
  epaycoResponse: string
  epaycoNameBilling: string
  epaycoAddressBilling: string
  epaycoTypeDocBilling: string
  epaycoNumberDocBilling: string
  epaycoExtra1: number
  epaycoExtra2: string
  epaycoExtra3: boolean
  epaycoMethod: string
  epaycoConfig: string
  epaycoKey: string
  epaycoTest: string
  epaycoImplementationType: string
  epaycoIp: string
}

/**
 * Plan
 *
 * Spanish:
 * Representa un plan dentro de una orden. Incluye detalles como identificadores, categoría,
 * tipo de viaje, nombres, valores, descuentos en diferentes monedas, actualizaciones, coberturas y condiciones.
 * Opcionalmente, puede tener un viewType que indique si se muestra en formato "list" o "grid".
 *
 * English:
 * Represents a plan within an order. It includes details such as identifiers, category,
 * type of travel, names, values, discounts in different currencies, upgrades, coverages, and conditions.
 * Optionally, it may have a viewType indicating whether it is displayed as "list" or "grid".
 */
export interface Plan {
  Id: number
  IdPlan: number
  Pregunta: string
  Categoria: string
  TipoViaje: string
  nombre: string
  ValorCobertura: string
  DescripcionDescuentosDolares: DescripcionDescuentos
  DescripcionDescuentosPesos: DescripcionDescuentos
  Valor: string
  ValorPax: string
  ValorPaxPesos: string
  ValorPesos: string
  upgrade: Upgrade[]
  cobertura: Cobertura[]
  Condiciones: Condiciones
  viewType?: 'list' | 'grid'
}

/**
 * Data
 *
 * Spanish:
 * Define la estructura de los datos de respuesta de una orden, que incluye una lista de planes y un identificador de prospecto.
 *
 * English:
 * Defines the structure for order response data, which includes a list of plans and a prospect identifier.
 */
export interface Data {
  planes: Plan[]
  idProspecto: number
}

/**
 * ResponseData
 *
 * Spanish:
 * Define la estructura de la respuesta de una orden. Contiene los datos de la orden y, en caso de error, un mensaje de error.
 *
 * English:
 * Defines the structure of an order response. It contains the order data and, in case of an error, an error message.
 */
export interface ResponseData {
  data: Data
  error: string | null
}
/**
 * dataOrder
 *
 * Spanish:
 * Representa la carga útil para realizar una orden. Incluye información como cantidad de pasajeros,
 * destino, edades, datos de contacto, y fechas de llegada y salida, entre otros.
 *
 * English:
 * Represents the payload for placing an order. It includes information such as the number of passengers,
 * destination, ages, contact details, and arrival and departure dates, among others.
 */
export interface dataOrder {
  cantidadPax: number
  destino: number
  edades: string
  email: string
  idUser: string
  lenguaje: string
  llegada: string
  numeroPregunta: number
  numerosPreguntas?: number[]
  pais: string
  salida: string
  telefono: string
}
//Order Isl Payload
export interface dataIslOrder {
  ValorTotalSinDescuentoDolares?: number
  ValorTotalSinDescuentoPesos?: number
  consideracionesgenerales: string
  detalleUpgrades: Upgrade[]
  emailcontacto?: string
  fechallegada: string
  fechasalida: string
  idCliente: number
  idDestino: number
  idOrigen: number
  idProducto: number
  idProspecto: number
  idUser: string
  idplan: number
  moneda: string
  nombrecontacto: string
  numeroViajeros: number
  paisdestino: number
  paisorigen: string
  pax: Pax[]
  referencia: string
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

export interface TravellerQuotation {
  id: number
  totalPlanTravelerPesos: string
  totalPlanTravelerDolar: string
  totalPlanWhitUpgradesPerTravelerPeso: string
  totalPlanWhitUpgradesPerTravelerDolar: string
  valorUpgradesPesos: string
  valorUpgradesDolar: string
  upgrades: { id: string; name: string }[]
}

export type Quotation = {
  planId: number
  queryId: string
  totalAllTravelersPesos: string
  totalAllTravelersDolar: string
  travellers: TravellerQuotation[]
}
/**
 * dataPreorder
 *
 * Spanish:
 * Representa la carga útil para una preorden. Incluye información detallada del cliente,
 * como consideraciones generales, correos, direcciones, fechas de llegada y salida, identificadores de ciudad y país,
 * datos del documento, información adicional, moneda, nombre y teléfono, entre otros.
 *
 * English:
 * Represents the payload for a preorder. It includes detailed customer information,
 * such as general considerations, emails, addresses, arrival and departure dates, city and country identifiers,
 * document data, additional information, currency, name, and phone number, among others.
 */
export interface dataPreorder {
  consideracionesgenerales?: string
  correoCliente?: string
  direccionCliente?: string
  edad?: string
  emailcontacto?: string
  fechallegada?: string
  fechasalida?: string
  idCiudadCliente?: number
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
/**
 * CheckPreorderISLResponse
 *
 * Spanish:
 * Define la estructura de la respuesta de la API para la verificación de una preorden ISL.
 * Contiene un objeto "mensaje" con diversos campos informativos y el identificador del cliente.
 *
 * English:
 * Defines the structure of the API response for checking an ISL preorder.
 * It contains a "mensaje" object with various informative fields and the client's identifier.
 */
export interface CheckPreorderISLResponse {
  mensaje: {
    '': string
    status: string
    valor: string
    documento: string
    referencia: string
    El_valor_de_cambio_fue_ajustado_a: string
  }
  idCliente: number
}
/**
 * AddOrderISLResponse
 *
 * Spanish:
 * Define la estructura de la respuesta de la API para la agregacion de una orden ISL.
 * Contiene un objeto con diversos campos informativos y el identificador de la venta.
 *
 * English:
 * Defines the structure of the API response for adding an ISL order.
 * It contains a object with various informative fields and the sale's identifier.
 */
export interface AddOrderISLResponse {
  '': string
  El_valor_de_cambio_fue_ajustado_a: string
  codigo: string
  documento: string
  idVenta: number
  referencia: string
  status: string
  valor: string
}

export interface Product {
  description: string
  id: number
  name: string
  price: number
}

interface JsonSol {
  pax: Array<{
    edad: number
    sexo: {
      label: string
      value: string
    }
    email: string
    idPais: number
    nombre: string
    apellidos: string
    apellidosContactoEmergencia: string
    document: string
    idNacionalidad: number
    idTipoDocumento: number
    medical: string
    nacimientos: string
    nombresContactoEmergencia: string
    telefono1ContactoEmergencia: string
    telefonos: string
  }>
  idUser: string
  idplan: number
  moneda: string
  idOrigen: number
  upgrades: string
  idCliente: number
  idDestino: number
  emailcontacto: string
  fechallegada: string
  fechasalida: string
  nombrecontacto: string
  numeroViajeros: number
  paisdestino: string
  paisorigen: string
  referencia: string
  telefonocontacto: string
  totalUpgradesPesos: number
  totalVenta: number
  totalVentaDolares: number
  totalVentaPesos: number
  valorProductoDolares: string
  valorProductoPesos: string
  valorViajeroDolares: string
  valorViajeroPesos: string
  consideracionesgenerales: string
  detalleUpgrades?: any[]
}

export interface ResSummaryData {
  idVentaItem: number
  idProducto: number
  idVenta: number
  idUser: number
  fechaInicio: string
  fechaFin: string
  DescripcionDescuentosDolares: {
    valorDescuento: number
    valorTotal: string
    porcentaje: string
  }
  DescripcionDescuentosPesos: {
    valorDescuento: number
    valorTotal: string
    porcentaje: string
  }
  JsonSol: JsonSol
  ValorTotalSinDescuentoDolares: number | string
  ValorTotalSinDescuentoPesos: number | string
  consideracionesgenerales: string
  detalleUpgrades: any[]
  emailcontacto: string
  fechallegada: string
  fechasalida: string
  idCliente: number
  idDestino: number | number[]
  idOrigen: number
  idProspecto: number
  idUser: string | number
  idplan: number
  moneda: string
  nombrecontacto: string
  numeroViajeros: number
  paisdestino: string
  paisorigen: string
  pax: Array<{
    edad: number
    sexo: {
      label: string
      value: string
    }
    email: string
    idPais: number
    nombre: string
    apellidos: string
    apellidosContactoEmergencia: string
    document: string
    idNacionalidad: number
    idTipoDocumento: number
    medical: string
    nacimientos: string
    nombresContactoEmergencia: string
    telefono1ContactoEmergencia: string
    telefonos: string
  }>
  referencia: string
  telefonocontacto: string
  totalUpgradesPesos: number | string
  totalVenta: number
  totalVentaDolares: number | string
  totalVentaPesos: number | string
  upgrades: string
  valorProductoDolares: string
  valorProductoPesos: string
  valorViajeroDolares: string
  valorViajeroPesos: string
  VentaDolares: string
  VentaPesos: string
  estado: string
  porcentajeDescuento: string
  producto: {
    idProducto: number
    nombre: string
    descripcionInterna: string
    tipo: string
    estaActivo: boolean
    idPregunta: number
    porcentajeDescuento: string
    tiempoMaximo: string
    tiempoMinimo: string
  }
  venta: {
    idVenta: number
    pasajeros: Array<any>
    cupon: null | any
    idPais: number
    idCliente: number
    voucher: null | any
    codVoucher: string
    estado: string
    fechaCreacion: string
    idUser: number
    numeroViajeros: number
    totalUpgradesPesos: string
    totalVentaDolares: string
    totalVentaPesos: string
    valorProductoDolares: string
    valorProductoPesos: string
    valorViajeroDolares: string
    valorViajeroPesos: string
  }
}

export interface EpaycoDetails {
  result: {
    success: boolean
    title_response: string
    text_response: string
    last_action: string
    data: {
      x_cust_id_cliente: number
      x_ref_payco: number
      x_id_factura: string
      x_id_invoice: string
      x_description: string
      x_mpd_points: number
      x_amount: number
      x_amount_country: number
      x_amount_ok: number
      x_tax: number
      x_tax_ico: number
      x_amount_base: number
      x_currency_code: string
      x_bank_name: string
      x_cardnumber: string
      x_quotas: string
      x_respuesta: string
      x_response: string
      x_approval_code: string
      x_transaction_id: string
      x_fecha_transaccion: string
      x_transaction_date: string
      x_cod_respuesta: number
      x_cod_response: number
      x_response_reason_text: string
      x_cod_transaction_state: number
      x_transaction_state: string
      x_errorcode: string
      x_franchise: string
      x_business: string
      x_customer_doctype: string
      x_customer_document: string
      x_customer_name: string
      x_customer_lastname: string
      x_customer_email: string
      x_customer_phone: string
      x_customer_movil: string
      x_customer_ind_pais: string
      x_customer_country: string
      x_customer_city: string
      x_customer_address: string
      x_customer_ip: string
      x_signature: string
      x_test_request: string
      x_transaction_cycle: null | string
      x_extra1: string
      x_extra2: string
      x_extra3: string
      x_extra4: string
      x_extra5: string
      x_extra6: string
      x_extra7: string
      x_extra8: string
      x_extra9: string
      x_extra10: string
      x_type_payment: string
      x_secondary_step: string
    }
  }
}

export interface EpaycoData {
  epaycoName: string
  epaycoDescription: string
  epaycoInvoice: string
  epaycoCurrency: string
  epaycoAmount: string
  epaycoLang: string
  epaycoExternal: string
  epaycoConfirmation: string
  epaycoResponse: string
  epaycoNameBilling: string
  epaycoAddressBilling: string
  epaycoTypeDocBilling: string
  epaycoNumberDocBilling: string
  epaycoExtra1: string
  epaycoExtra2: string
  epaycoExtra3: boolean
  epaycoExtra4: string
  epaycoMethod: string
  epaycoConfig: string
  epaycoKey: string
  epaycoTest: string
  epaycoImplementationType: string
  epaycoIp: string
}
