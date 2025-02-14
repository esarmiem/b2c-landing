import { CircleCheck, Download, RefreshCcw, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/TravelCore/Components/Raw/Link";
import { useTranslation } from "react-i18next";

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
  payment: PaymentDetails;
  onRetry: () => void;
  onDownloadVoucher: () => Promise<void>;
}

export const PaymentStatus: React.FC<PaymentStatusProps> = ({ payment, onRetry, onDownloadVoucher }) => {
  const { t } = useTranslation(["billingResult"]);
  const isApproved = payment.status === "approved";

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 flex flex-col gap-4 items-center justify-center">
      <Card className="w-full max-w-3xl">
        <CardHeader className={`${isApproved ? "bg-green-600" : "bg-red-600"} rounded-t-lg p-6`}>
          <div className="flex flex-col items-center justify-center gap-4">
            {isApproved ? <CircleCheck className="w-8 h-8 text-white" /> : <CircleX className="w-8 h-8 text-white" />}
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
            {isApproved ? (
              <Button onClick={onDownloadVoucher} className="w-full max-w-md hover:bg-white hover:text-black hover:border-2 hover:border-black">
                <Download className="w-4 h-4 mr-2" />
                {t("label-download-voucher")}
              </Button>
            ) : (
              <Button onClick={onRetry} className="w-full max-w-md text-xs md:text-base hover:bg-white hover:text-black hover:border-2 hover:border-black">
                <RefreshCcw className="w-4 h-4 mr-2" />
                {t("label-retry-payment")}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      <Link href="/" className="font-medium cursor-pointer ">{t("label-back-to-home")}</Link>
    </div>
  );
};