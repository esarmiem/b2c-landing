import { useState } from "react";
import { CircleCheck, Download, RefreshCcw, CircleX, Clock } from "lucide-react";
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
}

interface DataSummary {
  travelersNumber: number;
  valueCOP: number;
  value: number;
  passengerValueCOP: number;
  passengerValue: number;
  upgrades: Array<{
    name: string;
    value: number;
    valueCOP: number;
    passengers: number;
  }>;
  totalUpgrades: number;
  totalOrderCOP: number;
  totalOrderUSD: number;
  status: string;
  USDdiscount: {
    percentage: number;
    discountValue: number;
    totalValue: number;
  };
  COPdiscount: {
    percentage: number;
    discountValue: number;
    totalValue: number;
  };
}

interface PaymentStatusProps {
  payment: PaymentDetails;
  dataSummary: DataSummary | null;
  status: string;
  onRetry: () => void;
  voucher: any;
  pathResponse: string;
}

export const PaymentStatus: React.FC<PaymentStatusProps> = ({ 
  payment, 
  dataSummary, 
  status, 
  onRetry,
  voucher, 
  pathResponse 
}) => {
  const { t } = useTranslation(["billingResult"]);
  const [copied, setCopied] = useState(false);
  
  // Determine state status
  const isApproved = status === "Aprobado" || status === "Pagado";
  const isPending = status === "Pendiente";
  const isRejected = status === "Rechazado";
  
  // Ensure dataSummary is not null before accessing its properties
  const hasData = dataSummary !== null;

  // Status-based styling
  const getStatusColor = () => {
    if (isApproved) return "bg-green-600";
    if (isPending) return "bg-yellow-500";
    if (isRejected) return "bg-red-600"; // Agregar esta línea
    return "bg-red-600";
  };

  // Status icon
  const StatusIcon = () => {
    if (isApproved) return <CircleCheck className="w-8 h-8 text-white" />;
    if (isPending) return <Clock className="w-8 h-8 text-white" />;
    return <CircleX className="w-8 h-8 text-white" />;
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col gap-4 items-center justify-center py-6 px-2 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <Card className="w-full max-w-3xl">
        <CardHeader className={`${getStatusColor()} rounded-t-lg p-6`}>
          <div className="flex flex-col items-center justify-center gap-4">
            <StatusIcon />
            <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
              {isApproved 
                ? t("label-payment-approved") 
                : isPending 
                  ? t("label-payment-pending")
                  : t("label-payment-declined")}
            </h1>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              {isApproved 
                ? t("label-payment-approved-message") 
                : isPending 
                  ? t("label-payment-pending-message")
                  : t("label-payment-declined-message")}
            </p>
          </div>

          {/* Información básica de la orden siempre visible */}
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
              
              {/* Información detallada solo para estado Aprobado */}
              {isApproved && hasData && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-500 font-semibold">{t("label-travelers-number")}</span>
                    <span>{dataSummary.travelersNumber}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">{t("label-price-per-person-cop")}</span>
                    <span className="text-end font-medium">
                      ${dataSummary.passengerValueCOP.toLocaleString()} COP
                    </span>
                  </div>
                  <Separator className="" />
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">{t("label-price-per-person-usd")}</span>
                    <span className="text-end font-medium">
                      ${dataSummary.passengerValue} USD
                    </span>
                  </div>
                  <Separator className="" />
                  
                  {/* Mostrar descuentos si existen */}
                  {dataSummary.COPdiscount && dataSummary.COPdiscount.percentage > 0 && (
                    <>
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-gray-600">{t("label-discount-cop")} ({dataSummary.COPdiscount.percentage}%)</span>
                        <span className="text-end font-medium text-green-600">
                          -${dataSummary.COPdiscount.discountValue.toLocaleString()} COP
                        </span>
                      </div>
                      <Separator className="" />
                    </>
                  )}
                  
                  {dataSummary.USDdiscount && dataSummary.USDdiscount.percentage > 0 && (
                    <>
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-gray-600">{t("label-discount-usd")} ({dataSummary.USDdiscount.percentage}%)</span>
                        <span className="text-end font-medium text-green-600">
                          -${dataSummary.USDdiscount.discountValue} USD
                        </span>
                      </div>
                      <Separator className="" />
                    </>
                  )}
                  
                  {/* Mostrar upgrades si existen */}
                  {dataSummary.upgrades && dataSummary.upgrades.length > 0 && (
                    <>
                      <h3 className="font-semibold col-span-2">{t("label-upgrades")}</h3>
                      {dataSummary.upgrades.map((upgrade, index) => (
                        <div key={index} className="grid grid-cols-2 gap-2 pl-4">
                          <span className="text-gray-600">{upgrade.name} ({upgrade.passengers} {t("label-travelers")})</span>
                          <span className="text-end font-medium">
                            ${upgrade.valueCOP.toLocaleString()} COP
                          </span>
                        </div>
                      ))}
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-gray-600 font-semibold">{t("label-total-upgrades")}</span>
                        <span className="text-end font-medium">
                          ${dataSummary.totalUpgrades.toLocaleString()} COP
                        </span>
                      </div>
                      <Separator className="" />
                    </>
                  )}
                  
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">{t("label-total-price-cop")}</span>
                    <span className="text-end font-medium">
                      ${dataSummary.totalOrderCOP.toLocaleString()} COP
                    </span>
                  </div>
                  <Separator className="" />
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">{t("label-total-price-usd")}</span>
                    <span className="text-end font-medium">
                      ${dataSummary.totalOrderUSD} USD
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-4 border-t">
                    <span className="font-semibold">{t("label-total-amount")}</span>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">
                        ${dataSummary.totalOrderCOP.toLocaleString()} COP
                      </span>
                    </div>
                  </div>
                </>
              )}
              
              {/* Para estados no aprobados, mostrar mensaje de monto no procesado */}
              {!isApproved && (
                <div className="grid grid-cols-2 gap-2 pt-4 border-t">
                  <span className="font-semibold">{t("label-total-amount")}</span>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      {hasData ? `$${dataSummary.totalOrderCOP.toLocaleString()} COP` : "--"}
                    </span>
                    <span className={`text-xs ml-2 ${isPending ? "text-yellow-600" : "text-red-600"}`}>
                      {isPending ? t("label-payment-pending-status") : t("label-payment-not-processed")}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mostrar URL para copiar en estados Pendiente o Cotizado */}
          {(status === "Cotizado" || status === "Pendiente") && pathResponse && (
            <div className="flex justify-center pt-4">
              <div className="text-center">
                <span>{pathResponse}</span>
                <CopyToClipboard text={pathResponse} onCopy={() => setCopied(true)}>
                  <span className="ml-2 text-blue-600 cursor-pointer">{t("copy-to-clipboard")}</span>
                </CopyToClipboard>
                {copied ? (<span className="text-primary ml-2">{t("copied")}</span>) : null}
              </div>
            </div>
          )}

          <div className="flex justify-center pt-4">
            {isApproved && voucher ? (
              <a
                href={voucher}
                target="__blank"
                className="w-full max-w-md flex items-center justify-center bg-black text-white p-3 rounded-md hover:bg-white hover:text-black hover:border-2 hover:border-black"
              >
                <Download className="w-4 h-4 mr-2"/>
                {t("label-download-voucher")}
              </a>
            ) : (
              <Button 
                onClick={onRetry} 
                className="w-full max-w-md text-xs md:text-base bg-black text-white p-3 rounded-md hover:bg-white hover:text-black hover:border-2 hover:border-black"
              >
                <RefreshCcw className="hidden md:flex w-4 h-4 mr-2"/>
                {isPending 
                  ? t("label-check-payment-status") 
                  : t("label-retry-payment")}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      <Link href="/" className="font-medium cursor-pointer ">{t("label-back-to-home")}</Link>
    </div>
  );
};