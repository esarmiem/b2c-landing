import useData from '@/TravelCore/Hooks/useData.ts'
import useMasters from '@/TravelCore/Hooks/useMasters.ts'

import type {
  CheckPreorderISLResponse,
  dataIslOrder,
  dataPreorder,
  Pax,
  EpaycoData,
  PaxForm,
  Billing
} from '@/TravelCore/Utils/interfaces/Order.ts'
import type { DocumentTypeItems } from '@/TravelCore/Utils/interfaces/Document.ts'
import { v4 as uuidv4 } from 'uuid'
import { calculateAge, parceDate } from '@/TravelCore/Utils/dates.ts'
import { CONFIRM_PAY_PLATTFORM_URL, PAY_PLATTFORM_KEY, RESPONSE_PAY_PLATTFORM_URL } from '@/TravelCore/Utils/constants.ts'

/**
 * useInvoiceState
 *
 * Spanish:
 * Hook personalizado para gestionar el estado de la página de facturacion. Este hook se encarga de:
 * - Ejecutar la autenticación del usuario y establecer la sesión.
 * - Cargar los datos maestros (master data) si la autenticación es exitosa.
 * - Proveer funciones para obtener datos de órdenes y validar la carga útil de una orden.
 *
 * English:
 * Custom hook to manage the invoice page state. This hook is responsible for:
 * - Executing user authentication and setting the session.
 * - Loading master data if authentication is successful.
 * - Providing functions to fetch order data and validate the order payload.
 *
 * @returns {Object} Un objeto que contiene las funciones HandleGetOrder e isDataOrderValid.
 *                   / An object containing the HandleGetOrder and isDataOrderValid functions.
 */
export default function useInvoiceState() {
  // Obtener la función para establecer la sesión y la data del pedido.
  // Get the function to set the session and order data.
  const { data } = useData() || {}
  const master = useMasters()
  const documentType = master?.documents.data?.items as DocumentTypeItems[]

  const mapperArrayPax = (travelersData: any, emergencyContact: any): Pax[] => {
    const paxArray: Pax[] = travelersData
      .filter((item: PaxForm): item is NonNullable<typeof item> => item !== undefined)
      .map((item: PaxForm) => ({
        apellidos: item?.lastName,
        apellidosContactoEmergencia: emergencyContact?.lastName,
        document: item?.documentNumber,
        edad: calculateAge(item?.birthdate || ''),
        email: item?.email,
        idNacionalidad: Number(item?.nationality),
        idPais: Number(item?.residenceCountry),
        idTipoDocumento: documentType.find(type => type?.estaActivo && type?.abreviacion === item?.documentType)?.idTipoDocumento,
        medical: '',
        nacimientos: parceDate(item?.birthdate),
        nombre: item?.firstName,
        nombresContactoEmergencia: emergencyContact?.firstName,
        sexo: { value: item?.gender === 'f' ? 'F' : 'M', label: item?.gender === 'f' ? 'Femenino' : 'Masculino' },
        telefono1ContactoEmergencia: emergencyContact?.phone1,
        telefonos: emergencyContact?.phone2
      }))
    return paxArray
  }

  const mapperAddOrder = (preResponse: CheckPreorderISLResponse): dataIslOrder => {
    const savedTravelers: PaxForm = data?.travelersData?.[0] || {
      firstName: '',
      lastName: '',
      documentType: '',
      documentNumber: '',
      birthdate: '',
      age: 0,
      gender: '',
      nationality: 0,
      residenceCountry: 0,
      email: '',
      phone: '',
      countryCode: '',
      billingCountry: '',
      billingCity: '',
      address: '',
      additional: ''
    }
    const savedOrder = data?.payloadOrder
    const savedResponseOrder = data?.responseOrder
    const savedSelectedPlan = data?.selectedPlan
    const selectedPlan = savedResponseOrder?.planes.find(plan => plan.IdPlan === savedSelectedPlan)

    const order: dataIslOrder = {
      ValorTotalSinDescuentoDolares: selectedPlan?.DescripcionDescuentosDolares?.valorTotal || 0,
      ValorTotalSinDescuentoPesos: selectedPlan?.DescripcionDescuentosPesos?.valorTotal || 0,
      consideracionesgenerales: 'ninguna',
      detalleUpgrades: [],
      emailcontacto: savedTravelers?.email,
      fechallegada: savedOrder?.llegada || '',
      fechasalida: savedOrder?.salida || '',
      idCliente: preResponse?.idCliente || 0,
      idDestino: savedOrder?.destino || 0,
      //idOrigen: parseInt(savedOrder?.pais || "0"),
      idOrigen: 46,
      idProducto: savedOrder?.numeroPregunta || 0,
      idProspecto: savedResponseOrder?.idProspecto || 0,
      idUser: savedOrder?.idUser || '0',
      idplan: savedSelectedPlan || 0,
      moneda: 'COP',
      nombrecontacto: savedTravelers?.firstName + ' ' + savedTravelers?.lastName,
      numeroViajeros: savedOrder?.cantidadPax || 0,
      paisdestino: savedOrder?.destino || 0,
      paisorigen: savedOrder?.pais || '',
      pax: mapperArrayPax(data?.travelersData, data?.emergencyContactData),
      referencia: preResponse?.mensaje?.referencia || '',
      telefonocontacto: savedTravelers?.countryCode?.replace('+', '') || '' + savedTravelers?.phone || '' || '',
      totalUpgradesPesos: 0,
      totalVenta: Number.parseInt(selectedPlan?.ValorPesos || '0'),
      totalVentaDolares: Number.parseInt(selectedPlan?.Valor || '0'),
      totalVentaPesos: Number.parseInt(selectedPlan?.ValorPesos || '0'),
      upgrades: '1;2',
      valorProductoDolares: selectedPlan?.Valor || '',
      valorProductoPesos: selectedPlan?.ValorPesos || '',
      valorViajeroDolares: selectedPlan?.ValorPax || '',
      valorViajeroPesos: selectedPlan?.ValorPaxPesos || ''
    }
    return order
  }

  const mapperPreorder = (billing: Billing): dataPreorder => {
    const savedTravelers = data?.travelersData?.[0]
    const savedOrder = data?.payloadOrder
    const savedResponseOrder = data?.responseOrder
    const savedSelectedPlan = data?.selectedPlan

    console.log('savedTravelers', savedTravelers)

    const preOrder: dataPreorder = {
      consideracionesgenerales: 'ninguna',
      correoCliente: savedTravelers?.email,
      direccionCliente: billing?.address,
      edad: savedOrder?.edades,
      emailcontacto: savedTravelers?.email,
      fechallegada: savedOrder?.llegada,
      fechasalida: savedOrder?.salida,
      idCiudadCliente: Number.parseInt(billing?.billingCity || '0'),
      idPaisCliente: Number.parseInt(billing?.billingCountry || '0'),
      idProspecto: savedResponseOrder?.idProspecto || 0,
      idTipoDocumentoCliente: documentType.filter(type => type?.estaActivo && type?.abreviacion === savedTravelers?.documentType)[0]
        ?.idTipoDocumento,
      idUser: savedOrder?.idUser || '',
      idplan: savedSelectedPlan || 0,
      informacionAdicionalCliente: '',
      moneda: 'COP',
      nombreCliente: savedTravelers?.firstName + ' ' + savedTravelers?.lastName,
      nombrecontacto: savedTravelers?.firstName + ' ' + savedTravelers?.lastName,
      numeroDocumentoCliente: savedTravelers?.documentNumber || '',
      paisdestino: savedOrder?.destino || 0,
      paisorigen: savedOrder?.pais || '',
      referencia: uuidv4(),
      telefonoCliente: Number.parseInt(savedTravelers?.phone || '0'), //savedTravelers?.countryCode + savedTravelers?.phone,
      telefonocontacto: savedTravelers?.phone || '', //savedTravelers?.countryCode?.replace("+", "") + savedTravelers?.phone,
      upgrades: '1;2'
    }
    return preOrder
  }

  interface mapperPaymentResult {
    mapPayment: EpaycoData
    transactionId: string
  }

  const mapperPayment = (responseIp: string, responseAddOrder: any): mapperPaymentResult => {
    const savedBilling = data?.billingData
    const savedResponseOrder = data?.responseOrder
    const savedSelectedPlan = data?.selectedPlan
    const selectedPlan = savedResponseOrder?.planes.find(plan => plan.IdPlan === savedSelectedPlan)

    const payment: EpaycoData = {
      epaycoName: selectedPlan?.Categoria || '',
      epaycoDescription: selectedPlan?.nombre || '',
      epaycoInvoice: responseAddOrder?.codigo || '',
      epaycoCurrency: 'COP',
      epaycoAmount: selectedPlan?.ValorPesos || '',
      epaycoLang: 'es',
      epaycoExternal: 'true',
      epaycoConfirmation: CONFIRM_PAY_PLATTFORM_URL,
      epaycoResponse: RESPONSE_PAY_PLATTFORM_URL,
      epaycoNameBilling: savedBilling?.firstName || '' + ' ' + savedBilling?.lastName || '',
      epaycoAddressBilling: savedBilling?.address || '',
      epaycoTypeDocBilling: savedBilling?.documentType || '',
      epaycoNumberDocBilling: savedBilling?.documentNumber || '',
      epaycoExtra1: responseAddOrder?.idVenta || '',
      epaycoExtra2: 'es',
      epaycoExtra3: true,
      epaycoMethod: 'GET',
      epaycoConfig: '{}',
      epaycoKey: PAY_PLATTFORM_KEY,
      epaycoTest: 'false',
      epaycoImplementationType: 'handler',
      epaycoIp: responseIp
    }
    return { mapPayment: payment, transactionId: uuidv4() }
  }

  return { mapperPreorder, mapperAddOrder, mapperPayment }
}
