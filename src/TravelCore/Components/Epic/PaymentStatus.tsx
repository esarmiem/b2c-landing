import { useState } from "react";
import { CircleCheck, Download, RefreshCcw, CircleX, Loader, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/TravelCore/Components/Raw/Link";
import { useTranslation } from "react-i18next";
import { CopyToClipboard } from "react-copy-to-clipboard";


// Payment Details Interface
export interface PaymentDetails {
  orderNumber: string;
  organizationId: string;
  invoiceNumber: string;
  product: string;
  pricePerPersonCOP: number;
  pricePerPersonUSD: number;
  totalPriceCOP: number;
  totalPriceUSD: number;
  status: "approved" | "declined";
}

interface PaymentStatusProps {
  payment: PaymentDetails
  dataSummary: any
  status: string
  onRetry: () => void
  voucher: any
  pathResponse: string
}

export const PaymentStatus: React.FC<PaymentStatusProps> = ({ payment, dataSummary , status, onRetry, voucher, pathResponse }) => {
  const { t } = useTranslation(["billingResult"])
  const [copied, setCopied] = useState(false)
  let isApproved = false

  if (status === "Pagado") { //"Cotizado|Pendiente|Pagado|Rechazado"
    isApproved = true
  }

  console.log('data que llega:', dataSummary, status)

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col gap-4 items-center justify-center py-6 px-2 sm:px-6 md:px-8 lg:px-12 xl:px-16">

      {(status === "Cotizado" || status === "Pendiente") && (
          <div className="flex flex-col items-center justify-center bg-orange-50 rounded-t-lg p-6 ">
            <div className="flex justify-center pt-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">La transacción está pendiente de ser confirmada por el banco</h2>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <p className="text-gray-600">Con el siguiente link podrás consultar el estado de la transacción en
                      cualquier momento y validar si fue aprobada o rechazada.</p>
                  </p>
                </div>

                <p className="text-gray-600 mt-4">Le recomendamos copiar esta URL para consultarlo después.</p>

                <div className="inline-flex items-center p-2 border border-gray-300 rounded-md bg-gray-50">
                  <span className="text-red-600 hover:text-red-800 break-all text-sm">{pathResponse}</span>
                </div>

                <CopyToClipboard text={pathResponse} onCopy={() => setCopied(true)}>
                  <button
                      className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-2">
                    <Copy className="w-5 h-5"/>
                    <span>Copiar URL</span>
                  </button>
                </CopyToClipboard>

                {copied ? (
                    <span className="ml-2 text-primary">{t("copied")}</span>
                ) : null}
              </div>
            </div>
          </div>
      )}

      {status === 'loading' &&
          <div className="flex flex-col items-center justify-center gap-4 bg-gray-600 rounded-t-lg p-6 ">
            <Loader className="w-8 h-8 text-white"/>
            <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
              {t("label-loading-payment-result")}
            </h1>
          </div>
      }
      {status != 'loading' && (status === "Pagado" || status === "Rechazado") &&
          <Card className="w-full max-w-3xl">
            <CardHeader className={`${isApproved ? "bg-green-600" : "bg-red-600"} rounded-t-lg p-6`}>
              <div className="flex flex-col items-center justify-center gap-4">
                {isApproved ? <CircleCheck className="w-8 h-8 text-white"/> : <CircleX className="w-8 h-8 text-white"/>}
                <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
                  {isApproved ? t("label-payment-approved") : t("label-payment-declined")}
                </h1>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  {isApproved ? t("label-payment-approved-message") : t("label-payment-declined-message")}
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">{t("label-product-summary")}</h2>

                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-500 font-semibold">{t("label-order-number")}</span>
                    <span>{payment.orderNumber}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-500 font-semibold">{t("label-organization-id")}</span>
                    <span>{payment.organizationId}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-500 font-semibold">{t("label-invoice-number")}</span>
                    <span>{payment.invoiceNumber}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-500 font-semibold">{t("label-product")}</span>
                    <span>{payment.product}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">{t("label-price-per-person-cop")}</span>
                    <span className="text-end font-medium">${payment.pricePerPersonCOP.toLocaleString()} COP</span>
                  </div>
                  <Separator className="" />
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">{t("label-price-per-person-usd")}</span>
                    <span className="text-end font-medium">${payment.pricePerPersonUSD} USD</span>
                  </div>
                  <Separator className="" />
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">{t("label-total-price-cop")}</span>
                    <span className="text-end font-medium">${payment.totalPriceCOP.toLocaleString()} COP</span>
                  </div>
                  <Separator className="" />
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">{t("label-total-price-usd")}</span>
                    <span className="text-end font-medium">${payment.totalPriceUSD} USD</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-4 border-t">
                    <span className="font-semibold">{t("label-total-amount")}</span>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">${payment.totalPriceCOP.toLocaleString()} COP</span>
                      {!isApproved && <span className="text-red-600 text-xs ml-2">{t("label-payment-not-processed")}</span>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                {status === "Pagado" && voucher ? (
                    <a
                        href={voucher}
                        target="__blank"
                        className="w-full max-w-md hover:bg-white hover:text-black hover:border-2 hover:border-black"
                    >
                      <Download className="w-4 h-4 mr-2"/>
                      {t("label-download-voucher")}
                    </a>

                ) : (
                    <Button onClick={onRetry}
                            className="w-full max-w-md text-xs md:text-base hover:bg-white hover:text-black hover:border-2 hover:border-black">
                      <RefreshCcw className="hidden md:flex w-4 h-4 mr-2"/>
                      {t("label-retry-payment")}
                    </Button>
                )}
              </div>
            </CardContent>
          </Card>
      }

      <Link href="/" className="font-medium cursor-pointer ">{t("label-back-to-home")}</Link>
    </div>
  );
};