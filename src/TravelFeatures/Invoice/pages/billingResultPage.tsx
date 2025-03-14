import { PaymentStatus } from '@/TravelCore/Components/Epic/PaymentStatus'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Payment } from '@/TravelFeatures/Invoice/model/payment_entity.ts'
import {
  RESPONSE_PAY_PLATTFORM_URL,
  SERVICE_METHODS_EPAYCO,
  URL_EPAYCO_METHODS,
  CONFIRM_PAY_PLATTFORM_URL,
  PAY_PLATTFORM_KEY
} from '@/TravelCore/Utils/constants.ts'
import { Auth } from '@/TravelFeatures/Invoice/model/auth_entity.ts'
import useSession from '@/TravelCore/Hooks/useSession.ts'
import useInvoiceState from '@/TravelFeatures/Invoice/adapterHelper'
import { Order } from '@/TravelFeatures/Invoice/model/order_entity.ts'
import useData from '@/TravelCore/Hooks/useData.ts'

export const BillingResultPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [refEPayco, setRefEpayco] = useState<string>('')
  const [, setIdSale] = useState<string>('')
  const [dataVoucher, setDataVoucher] = useState<any>(null)
  const [dataSummary, setDataSummary] = useState<any>(null)
  const [status, setStatus] = useState<string>('loading')
  const [pathResponse, setPathResponse] = useState<string>('')
  const [_, setTransaction] = useState<string>('')
  const { setSession } = useSession() || {}
  const { mapperPayment } = useInvoiceState()
  const { setData } = useData() || {}
  //construccion de addOrder
  const [epaycoDetails, setEpaycoDetails] = useState<any>({})
  const [resSummaryData, setResSummaryData] = useState<any>({})

  const stateTransaction = epaycoDetails?.x_transaction_state
  const infoCardPayStatus = {
    product: decodeURIComponent(escape(epaycoDetails?.x_description)),
    organization: epaycoDetails?.x_business,
    nOrden: epaycoDetails?.x_id_invoice,
    nFactura: epaycoDetails?.x_id_factura
  }

  const gettokenAuthentication = async () => {
    try {
      const auth = new Auth()
      const response = await auth.login()

      if (response?.data && !response.error) {
        const sessionData = {
          token: response.data.payload.accessToken,
          role: JSON.stringify(response.data.user.role),
          user_id: response.data.user.idUser
        }
        setSession?.(sessionData)
        sessionStorage.setItem('token', response.data.payload.accessToken)
        return true
      }
    } catch (error) {
      console.error('Error durante la autenticación:', error)
    }
    return false
  }

  useEffect(() => {
    gettokenAuthentication()
    const ref = searchParams.get('ref_payco') || searchParams.get('x_extra1') || ''
    setRefEpayco(ref)
    setPathResponse(`${RESPONSE_PAY_PLATTFORM_URL}?x_extra1=${ref}`)

    if (ref !== null || ref !== '') getPaymentDetails(ref)
  }, [])

  const getPaymentDetails = async (ref: string) => {
    const payment = new Payment()
    const respDetails = await payment.getPaymentDetails(ref)
    console.log('Respuesta de getPaymentDetails: ', respDetails)
    if (respDetails?.data?.result?.data?.x_extra1 !== null) {
      setIdSale(respDetails?.data?.result?.data?.x_extra1)
      setTransaction(respDetails?.data?.result?.data?.x_extra4)
      setEpaycoDetails(respDetails?.data?.result?.data)

      console.log('parametros: ', respDetails?.data?.result?.data?.x_extra1)
      const respSummary = await payment.purchaseSummary(respDetails?.data?.result?.data?.x_extra1)
      console.log('Respuesta de purchaseSummary: ', respSummary)
      setResSummaryData(respSummary?.data)
      setDataSummary(adapterPurchaseSummaryResp(respSummary?.data))
      if (respSummary?.data && respSummary?.data?.estado === 'Pagado') {
        const respDownloader = await payment.downloadVoucher(respDetails?.data?.result?.data?.x_extra1)
        setDataVoucher(respDownloader)
      }
    }
  }

  const respAddOrder = {
    epaycoName: resSummaryData?.producto?.nombre,
    epaycoDescription: epaycoDetails?.x_description,
    epaycoInvoice: resSummaryData?.venta?.codVoucher || epaycoDetails?.result?.data?.x_id_factura,
    epaycoCurrency: epaycoDetails?.x_currency_code || 'COP',
    epaycoAmount: epaycoDetails?.x_amount?.toString() || resSummaryData.totalVentaPesos?.toString(),
    epaycoLang: 'es',
    epaycoExternal: 'true',
    epaycoConfirmation: CONFIRM_PAY_PLATTFORM_URL,
    epaycoResponse: RESPONSE_PAY_PLATTFORM_URL,
    epaycoNameBilling: `${resSummaryData?.JsonSol?.pax?.[0]?.nombre} ${resSummaryData?.JsonSol?.pax?.[0]?.apellidos}`,
    epaycoAddressBilling: epaycoDetails?.x_extra5,
    epaycoTypeDocBilling: resSummaryData?.JsonSol?.pax?.[0]?.idTipoDocumento?.toString(),
    epaycoNumberDocBilling: resSummaryData?.JsonSol?.pax?.[0]?.document,
    epaycoExtra1: resSummaryData?.idVenta?.toString() || epaycoDetails?.x_extra1,
    epaycoExtra2: epaycoDetails?.x_extra2 || 'es',
    epaycoExtra3: epaycoDetails?.x_extra3 === 'true' || false,
    epaycoExtra4: epaycoDetails?.x_extra4 || resSummaryData.referencia,
    epaycoExtra5: epaycoDetails?.x_extra5,
    epaycoMethod: 'GET',
    epaycoConfig: '{}',
    epaycoKey: PAY_PLATTFORM_KEY,
    epaycoTest: 'true',
    epaycoImplementationType: 'handler',
    epaycoIp: epaycoDetails?.x_customer_ip
  }

  console.log('respuesta: ', searchParams, refEPayco)

  const handleRetry = async () => {
    const order = new Order()
    const respIP = await order.getIP()

    console.log('Respuesta de la ip: ', respIP.data)
    const { mapPayment, transactionId } = mapperPayment(respIP.data.data, respAddOrder)

    const payloadString = JSON.stringify(mapPayment)
    const params = new URLSearchParams()
    params.append('fname', payloadString)

    const respPayment = await order.payment(params.toString(), transactionId)
    console.log('respPayment: ', respPayment, respPayment?.data, respPayment?.data?.data?.id_session)
    if (respPayment?.data.success && respPayment?.data?.data?.id_session !== '') {
      const transaction = respPayment?.data?.data?.id_session
      setData?.((prevData: any) => ({
        ...prevData,
        epaycoTx: transaction
      }))
      window.location.href = `${URL_EPAYCO_METHODS}/${SERVICE_METHODS_EPAYCO}?transaction=${transaction}`
    } else {
      alert('Ha ocurrido un error al procesar la orden con la pasarela de pago')
    }
  }

  const adapterPurchaseSummaryResp = (originalObject: any) => {
    console.log('adapterPurchaseSummaryResp', originalObject)
    setStatus(originalObject?.venta?.estado)
    return {
      travelersNumber: originalObject?.venta?.numeroViajeros,
      valueCOP: originalObject?.venta?.valorProductoPesos,
      value: originalObject?.venta?.valorProductoDolares,
      passengerValueCOP: originalObject?.venta?.valorViajeroPesos,
      passengerValue: originalObject?.venta?.valorViajeroDolares,
      upgrades: originalObject?.detalleUpgrades?.map((item: any) => {
        return {
          name: item.upgrade,
          value: item.valorUSD,
          valueCOP: item.valorCOP,
          passengers: item.pasajeros
        }
      }),
      totalUpgrades: originalObject?.venta?.totalUpgradesPesos,
      totalOrderCOP: originalObject?.venta?.totalVentaPesos,
      totalOrderUSD: originalObject?.venta?.totalVentaDolares,
      status: originalObject?.venta?.estado,
      USDdiscount: {
        percentage: originalObject?.DescripcionDescuentosDolares?.porcentaje,
        discountValue: originalObject?.DescripcionDescuentosDolares?.valorDescuento,
        totalValue: originalObject?.DescripcionDescuentosDolares?.valorTotal
      },
      COPdiscount: {
        percentage: originalObject?.DescripcionDescuentosPesos?.porcentaje,
        discountValue: originalObject?.DescripcionDescuentosPesos?.valorDescuento,
        totalValue: originalObject?.DescripcionDescuentosPesos?.valorTotal
      }
    }
  }

  return (
    <PaymentStatus
      dataSummary={dataSummary}
      status={status}
      state={stateTransaction}
      infoCardPayStatus={infoCardPayStatus}
      onRetry={handleRetry}
      voucher={dataVoucher?.voucher}
      pathResponse={pathResponse}
    />
  )
}

export default BillingResultPage
