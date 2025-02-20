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
  valorDescuento: string;
  valorTotal: number;
  porcentaje: string;
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
  valor_spa: string;
  valor_eng: string;
  id_benefit: string;
  name: string;
  language_id: string;
  extended_info: string;
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
  planes: Plan[];
  idProspecto: number;
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
  data: Data;
  error: string | null;
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
  cantidadPax: number;
  destino: number;
  edades: string;
  email: string;
  idUser: string;
  lenguaje: string;
  llegada: string;
  numeroPregunta: number;
  pais: string;
  salida: string;
  telefono: string;
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
  consideracionesgenerales: string;
  correoCliente: string;
  direccionCliente: string;
  edad: string;
  emailcontacto: string;
  fechallegada: string;
  fechasalida: string;
  idCiudadCliente: number;
  idPaisCliente: number;
  idProspecto: number;
  idTipoDocumentoCliente: number;
  idUser: string;
  idplan: number;
  informacionAdicionalCliente: string;
  moneda: string;
  nombreCliente: string;
  nombrecontacto: string;
  numeroDocumentoCliente: string;
  paisdestino: number;
  paisorigen: string;
  referencia: string;
  telefonoCliente: number;
  telefonocontacto: string;
  upgrades: string;
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
    "": string;
    status: string;
    valor: string;
    documento: string;
    referencia: string;
    El_valor_de_cambio_fue_ajustado_a: string;
  };
  idCliente: number;
}
