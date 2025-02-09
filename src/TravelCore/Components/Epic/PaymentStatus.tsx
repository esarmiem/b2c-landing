import { CircleCheck, Download, RefreshCcw, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/TravelCore/Components/Raw/Link"

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
  const isApproved = payment.status === "approved";

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 flex flex-col gap-4 items-center justify-center">
      <Card className="w-full max-w-3xl">
        <CardHeader className={`${isApproved ? "bg-green-600" : "bg-red-600"} rounded-t-lg p-6`}>
          <div className="flex flex-col items-center justify-center gap-4">
            {isApproved ? <CircleCheck className="w-8 h-8 text-white" /> : <CircleX className="w-8 h-8 text-white" />}
            <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
              {isApproved ? "¡Felicidades, su pago ha sido aprobado!" : "¡Lo sentimos, tu pago ha sido rechazado!"}
            </h1>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              {isApproved
                ? "Hemos enviado a tu correo electrónico registrado la información de tu compra. También podrás consultar a continuación el resumen de tu compra y descargar tu voucher."
                : "No hemos podido procesar tu pago. Por favor, verifica los datos de tu tarjeta o intenta con otro método de pago. También puedes contactar a tu entidad bancaria para más información."}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Resumen del producto</h2>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-500 font-semibold">Número de Orden:</span>
                <span>{payment.orderNumber}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-500 font-semibold">ID Organización:</span>
                <span>{payment.organizationId}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-500 font-semibold">No. Factura:</span>
                <span>{payment.invoiceNumber}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-500 font-semibold">Producto:</span>
                <span>{payment.product}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600">Valor por viajero en pesos:</span>
                <span className="text-end font-medium">${payment.pricePerPersonCOP.toLocaleString()} COP</span>
              </div>
              <Separator className="" />
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600">Valor por viajero en dólares:</span>
                <span className="text-end font-medium">${payment.pricePerPersonUSD} USD</span>
              </div>
              <Separator className="" />
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600">Valor del producto en pesos:</span>
                <span className="text-end font-medium">${payment.totalPriceCOP.toLocaleString()} COP</span>
              </div>
              <Separator className="" />
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600">Valor del producto en dólares:</span>
                <span className="text-end font-medium">${payment.totalPriceUSD} USD</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-4 border-t">
                <span className="font-semibold">Total Importe</span>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">${payment.totalPriceCOP.toLocaleString()} COP</span>
                  {!isApproved && <span className="text-red-600 text-xs ml-2">Pago no procesado</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            {isApproved ? (
              <Button onClick={onDownloadVoucher} className="w-full max-w-md hover:bg-white hover:text-black hover:border-2 hover:border-black">
                <Download className="w-4 h-4 mr-2" />
                Descargar Voucher
              </Button>
            ) : (
              <Button onClick={onRetry} className="w-full max-w-md text-xs md:text-base hover:bg-white hover:text-black hover:border-2 hover:border-black">
                <RefreshCcw className="w-4 h-4 mr-2" />
                Intenta nuevamente o elige otro método de pago
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      <Link href="/" className="font-medium cursor-pointer ">Volver al incio</Link>
    </div>
  );
};