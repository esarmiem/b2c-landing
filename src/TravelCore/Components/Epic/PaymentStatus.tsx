import { useState, useEffect } from 'react'
import {
  CircleCheck,
  Download,
  RefreshCcw,
  CircleX,
  Loader,
  Copy,
  CreditCard,
  Receipt,
  CalendarClock,
  Building2,
  Package2,
  DollarSign,
  Send,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Link } from '@/TravelCore/Components/Raw/Link'
import { useTranslation } from 'react-i18next'
import { CopyToClipboard } from 'react-copy-to-clipboard'

// Payment Details Interface
export interface PaymentDetails {
  orderNumber: string
  organizationId: string
  invoiceNumber: string
  product: string
  pricePerPersonCOP: number
  pricePerPersonUSD: number
  totalPriceCOP: number
  totalPriceUSD: number
  status: 'approved' | 'declined'
}

interface infoCardPayStatusType {
  product: string
  organization: string
  nOrden: string
  nFactura: string
}

interface PaymentStatusProps {
  dataSummary: any
  status: string
  state: string
  infoCardPayStatus: infoCardPayStatusType
  onRetry: () => void
  voucher: any
  pathResponse: string
}

export const PaymentStatus: React.FC<PaymentStatusProps> = ({
  dataSummary,
  status: initialStatus,
  state: initialState,
  infoCardPayStatus,
  onRetry,
  voucher,
  pathResponse
}) => {
  const { t } = useTranslation(['billingResult'])
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState(initialStatus || '')
  let isApproved = false

  useEffect(() => {
    if (initialState === 'Aceptada') {
      setStatus('Pagado')
    } else if (initialState === 'Rechazada') {
      setStatus('Rechazado')
    } else if (initialState && initialState !== 'Aceptada' && initialState !== 'Rechazada') {
      setStatus('Pendiente')
    } else {
      // Si no hay state, usar el status inicial
      setStatus(initialStatus || '')
    }
  }, [initialState, initialStatus])

  if (status === 'Pagado') {
    //"Cotizado|Pendiente|Pagado|Rechazado"
    isApproved = true
  }

  //este es el bloque de codigo que se debe reemplazar por el de ARRIBA si se quiere hacer la prueba para forzar el estado "Pagado" y así ver la pantalla de pago aprobado (by: elder)
  /*
export const PaymentStatus: React.FC<PaymentStatusProps> = ({
  payment,
  dataSummary,
  status: initialStatus, // Renombra el parámetro para evitar conflictos
  onRetry,
  voucher,
  pathResponse,
}) => {
  const { t } = useTranslation(["billingResult"]);
  const [copied, setCopied] = useState(false);
  
  // Sobreescribir el estado para forzar "Pagado"
  const status = "Pagado"; // Esta línea fuerza el estado
  
  let isApproved = false;
  if (status === "Pagado") {
    isApproved = true;
  }
  // El resto del componente permanece igual...
*/

  // Reset the copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [copied])

  console.log('data que llega:', dataSummary, status)

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col gap-6 items-center justify-center py-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      {(status === 'Cotizado' || status === 'Pendiente') && (
        <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl border border-gray-100 transition-all duration-300 hover:shadow-xl">
          <div className="flex justify-center pt-4 w-full">
            <div className="text-center space-y-6 w-full">
              <div className="mx-auto bg-amber-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-amber-600" />
              </div>

              <h2 className="text-2xl font-bold text-gray-800">{t('label-payment-pending')}</h2>

              <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
                <p className="text-gray-700">{t('label-payment-pending-message')}</p>
              </div>

              <p className="text-gray-600 mt-6 font-medium">{t('label-copy-url-message')}</p>

              <div className="relative">
                <div className="inline-flex items-center p-4 border border-gray-200 rounded-lg bg-gray-50 w-full break-all text-left">
                  <span className="text-red-600 hover:text-red-800 text-sm">{pathResponse}</span>
                </div>

                <CopyToClipboard text={pathResponse} onCopy={() => setCopied(true)}>
                  <button
                    type="button"
                    className="mt-4 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2 flex items-center justify-center space-x-3 w-full transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <Copy className="w-5 h-5" />
                    <span className="font-medium">{t('label-copy-url')}</span>
                  </button>
                </CopyToClipboard>

                {copied && (
                  <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm font-medium flex items-center animate-fade-in">
                    <CircleCheck className="w-4 h-4 mr-1" />
                    {t('copied')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {status === 'loading' && (
        <div className="flex flex-col items-center justify-center gap-5 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl shadow-lg p-10 w-full max-w-2xl">
          <div className="animate-pulse flex flex-col items-center">
            <div className="bg-gray-500/30 rounded-full p-4">
              <Loader className="w-10 h-10 text-white animate-spin" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white text-center mt-6">{t('label-loading-payment-result')}</h1>
            <p className="text-gray-300 mt-4 text-center">{t('label-please-wait')}</p>
          </div>
        </div>
      )}

      {status !== 'loading' && (status === 'Pagado' || status === 'Rechazado') && dataSummary && (
        <Card className="w-full max-w-3xl overflow-hidden shadow-xl border-0 transition-all duration-300 hover:shadow-2xl">
          <CardHeader
            className={`
            ${isApproved ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'} rounded-t-lg p-8`}
          >
            <div className="flex flex-col items-center justify-center gap-5">
              <div
                className={`
                ${isApproved ? 'bg-green-400/30' : 'bg-red-400/30'} 
                rounded-full p-4 animate-bounce-slow`}
              >
                {isApproved ? <CircleCheck className="w-12 h-12 text-white" /> : <CircleX className="w-12 h-12 text-white" />}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
                {isApproved ? t('label-payment-approved') : t('label-payment-declined')}
              </h1>
              <p className="text-white/80 text-center max-w-md">
                {isApproved
                  ? t('label-payment-approved-subtitle', {
                      date: new Date().toLocaleDateString()
                    })
                  : t('label-payment-declined-subtitle')}
              </p>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-8 bg-white">
            <div
              className={`
              ${isApproved ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'} 
              p-6 rounded-lg`}
            >
              <p className={`${isApproved ? 'text-green-700' : 'text-red-700'} leading-relaxed`}>
                {isApproved ? t('label-payment-approved-message') : t('label-payment-declined-message')}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center">
                <Receipt className="w-5 h-5 text-gray-500 mr-2" />
                <h2 className="text-xl font-bold text-gray-800">{t('label-product-summary')}</h2>
              </div>

              <div className="grid gap-5 bg-gray-50 p-6 rounded-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                    <CreditCard className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-gray-500 text-sm font-medium block">{t('label-order-number')}</span>
                      <span className="font-semibold text-gray-800">{infoCardPayStatus?.nOrden}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                    <Building2 className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-gray-500 text-sm font-medium block">{t('label-organization-id')}</span>
                      <span className="font-semibold text-gray-800">{infoCardPayStatus?.organization}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                    <CalendarClock className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-gray-500 text-sm font-medium block">{t('label-invoice-number')}</span>
                      <span className="font-semibold text-gray-800">{infoCardPayStatus?.nFactura}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                    <Package2 className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-gray-500 text-sm font-medium block">{t('label-product')}</span>
                      <span className="font-semibold text-gray-800">{infoCardPayStatus?.product}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3 bg-white p-4 rounded-lg border border-gray-100">
                  <div className="grid grid-cols-2 gap-2 items-center">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-gray-500 mr-1" />
                      <span className="text-gray-600">{t('label-price-per-person-cop')}</span>
                    </div>
                    <span className="text-end font-medium text-gray-800">${dataSummary.passengerValueCOP?.toLocaleString() || 0} COP</span>
                  </div>
                  <Separator className="my-2" />

                  <div className="grid grid-cols-2 gap-2 items-center">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-gray-500 mr-1" />
                      <span className="text-gray-600">{t('label-price-per-person-usd')}</span>
                    </div>
                    <span className="text-end font-medium text-gray-800">${dataSummary.passengerValue || 0} USD</span>
                  </div>
                  <Separator className="my-2" />

                  {/* Mostrar descuentos si existen */}
                  {dataSummary.COPdiscount && dataSummary.COPdiscount.percentage > 0 && (
                    <>
                      <div className="grid grid-cols-2 gap-2 items-center">
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 text-gray-500 mr-1" />
                          <span className="text-gray-600">
                            {t('label-discount')} ({dataSummary.COPdiscount.percentage}%)
                          </span>
                        </div>
                        <span className="text-end font-medium text-green-600">
                          -$
                          {dataSummary.COPdiscount.discountValue?.toLocaleString() || 0} COP
                        </span>
                      </div>
                      <Separator className="my-2" />
                    </>
                  )}

                  {/* Mostrar upgrades si existen */}
                  {dataSummary.upgrades && dataSummary.upgrades.length > 0 && (
                    <>
                      <div className="grid grid-cols-2 gap-2 items-center">
                        <div className="flex items-center">
                          <Send className="w-4 h-4 text-blue-500 mr-1" />
                          <span className="text-gray-600">{t('label-upgrades')}</span>
                        </div>
                        <span className="text-end font-medium text-gray-800">${dataSummary.totalUpgrades?.toLocaleString() || 0} COP</span>
                      </div>
                      <Separator className="my-2" />
                    </>
                  )}

                  <div className="grid grid-cols-2 gap-2 items-center">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-gray-500 mr-1" />
                      <span className="text-gray-600">{t('label-total-price-cop')}</span>
                    </div>
                    <span className="text-end font-medium text-gray-800">${dataSummary.totalOrderCOP?.toLocaleString() || 0} COP</span>
                  </div>
                  <Separator className="my-2" />

                  <div className="grid grid-cols-2 gap-2 items-center">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-gray-500 mr-1" />
                      <span className="text-gray-600">{t('label-total-price-usd')}</span>
                    </div>
                    <span className="text-end font-medium text-gray-800">${dataSummary.totalOrderUSD || 0} USD</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-4 mt-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 text-gray-700 mr-2" />
                      <span className="font-bold text-gray-800">{t('label-total-amount')}</span>
                    </div>
                    <div className="flex items-center justify-end">
                      <span className="font-bold text-lg text-gray-800">${dataSummary.totalOrderCOP?.toLocaleString() || 0} COP</span>
                      {!isApproved && (
                        <span className="text-red-600 text-xs ml-2 bg-red-50 px-2 py-1 rounded-full">
                          {t('label-payment-not-processed')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              {status === 'Pagado' && voucher ? (
                <a
                  href={voucher}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-md px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-md hover:shadow-lg font-medium"
                >
                  <Download className="w-5 h-5 mr-2" />
                  <span>{t('label-download-voucher')}</span>
                </a>
              ) : (
                <Button
                  onClick={onRetry}
                  className="w-full max-w-md px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-md hover:shadow-lg font-medium"
                >
                  <RefreshCcw className="w-5 h-5 mr-2" />
                  <span>{t('label-retry-payment')}</span>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Link
        href="/"
        className="mt-6 font-medium cursor-pointer text-gray-600 hover:text-gray-900 flex items-center hover:underline transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        {t('label-back-to-home')}
      </Link>
    </div>
  )
}
