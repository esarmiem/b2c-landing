import { PaymentStatus } from "@/TravelCore/Components/Epic/PaymentStatus"
import { useSearchParams } from "react-router-dom";
import {useEffect, useState} from "react";
import {Payment} from "@/TravelFeatures/Invoice/model/payment_entity.ts";
import {RESPONSE_PAY_PLATTFORM_URL} from "@/TravelCore/Utils/constants.ts";

// Simulated payment data
const paymentData = {
  orderNumber: "1234567890",
  organizationId: "AB-123456789XYZ",
  invoiceNumber: "98765",
  product: "asistencia de viaje internacional",
  pricePerPersonCOP: 713120.76,
  pricePerPersonUSD: 162,
  totalPriceCOP: 1426241.52,
  totalPriceUSD: 324,
  status: "declined" as const, // 'declined' or 'approved' para ver una u otra pantalla by: elder
}

export const BillingResultPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [refEPayco, setRefEpayco] = useState<string>("")
    const [, setIdSale] = useState<string>("")
    const [dataVoucher, setDataVoucher] = useState<any>(null)
    const [dataSummary, setDataSummary] = useState<any>(null)
    const [status, setStatus] = useState<string>("loading")
    const [pathResponse, setPathResponse] = useState<string>("")

    useEffect(() => {
        const ref = searchParams.get("ref_payco") || searchParams.get("x_extra1") || ""
        setRefEpayco(ref)
        if (ref !== null || ref !== "")
            getPaymentDetails(ref)
    }, [])

    const getPaymentDetails = async (ref: string) => {
        const payment = new Payment()
        const respDetails = await payment.getPaymentDetails(ref)
        if (respDetails?.data?.result?.data?.x_extra1) {
            setIdSale(respDetails?.data?.result?.data?.x_extra1)
            setPathResponse(`${RESPONSE_PAY_PLATTFORM_URL}?x_extra1=${refEPayco}`)

            const respSummary = await payment.purchaseSummary(respDetails?.data?.result?.data?.x_extra1)
            setDataSummary(adapterPurchaseSummaryResp(respSummary))

            const respDownloader = await payment.downloadVoucher(respDetails?.data?.result?.data?.x_extra1)
            setDataVoucher(respDownloader)
        }
    }

console.log('respuesta: ', searchParams, refEPayco)
  
    const handleRetry = () => {
      // Implement retry logic here
      console.log("Retrying payment...");
    };

    const adapterPurchaseSummaryResp = (originalObject: any) => {
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
                    passengers: item.pasajeros,
                };
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
        payment={paymentData}
        dataSummary={dataSummary}
        status={status}
        onRetry={handleRetry}
        voucher={dataVoucher?.voucher}
        pathResponse={pathResponse}
      />
    );
  };
  
  export default BillingResultPage;
