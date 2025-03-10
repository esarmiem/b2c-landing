import { PaymentStatus } from "@/TravelCore/Components/Epic/PaymentStatus"
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Payment } from "@/TravelFeatures/Invoice/model/payment_entity.ts";
import { RESPONSE_PAY_PLATTFORM_URL } from "@/TravelCore/Utils/constants.ts";

export const BillingResultPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [refEPayco, setRefEpayco] = useState<string>("")
    const [, setIdSale] = useState<string>("")
    const [dataVoucher, setDataVoucher] = useState<any>(null)
    const [dataSummary, setDataSummary] = useState<any>(null)
    const [status, setStatus] = useState<string>("loading")
    const [pathResponse, setPathResponse] = useState<string>("")
    const [paymentDetails, setPaymentDetails] = useState({
      orderNumber: "",
      organizationId: "",
      invoiceNumber: "",
      product: "asistencia de viaje internacional",
    })

    useEffect(() => {
        const ref = searchParams.get("ref_payco") || searchParams.get("x_extra1") || ""
        setRefEpayco(ref)
        if (ref !== null && ref !== "")
            getPaymentDetails(ref)
    }, [searchParams])

    const getPaymentDetails = async (ref: string) => {
        try {
            const payment = new Payment()
            const respDetails = await payment.getPaymentDetails(ref)
            
            if (respDetails?.data?.result?.data?.x_extra1) {
                const idSale = respDetails?.data?.result?.data?.x_extra1
                setIdSale(idSale)
                setPathResponse(`${RESPONSE_PAY_PLATTFORM_URL}?x_extra1=${refEPayco}`)

                // Actualizar detalles de pago con datos de la respuesta
                setPaymentDetails({
                    orderNumber: respDetails?.data?.result?.data?.x_id_invoice || "",
                    organizationId: respDetails?.data?.result?.data?.x_business_nit || "",
                    invoiceNumber: respDetails?.data?.result?.data?.x_id_invoice || "",
                    product: "asistencia de viaje internacional",
                })

                const respSummary = await payment.purchaseSummary(idSale)
                const adaptedData = adapterPurchaseSummaryResp(respSummary)
                setDataSummary(adaptedData)

                const respDownloader = await payment.downloadVoucher(idSale)
                setDataVoucher(respDownloader)
            }
        } catch (error) {
            console.error("Error fetching payment details:", error)
            setStatus("Rechazado")
        }
    }
  
    const handleRetry = () => {
      // Implement retry logic here
      console.log("Retrying payment...");
    };

    const adapterPurchaseSummaryResp = (originalObject: any) => {
        // Actualiza el estado global
        setStatus(originalObject?.venta?.estado || "Rechazado")
        
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
            }) || [],
            totalUpgrades: originalObject?.venta?.totalUpgradesPesos || 0,
            totalOrderCOP: originalObject?.venta?.totalVentaPesos || 0,
            totalOrderUSD: originalObject?.venta?.totalVentaDolares || 0,
            status: originalObject?.venta?.estado,
            USDdiscount: {
                percentage: originalObject?.DescripcionDescuentosDolares?.porcentaje || 0,
                discountValue: originalObject?.DescripcionDescuentosDolares?.valorDescuento || 0,
                totalValue: originalObject?.DescripcionDescuentosDolares?.valorTotal || 0
            },
            COPdiscount: {
                percentage: originalObject?.DescripcionDescuentosPesos?.porcentaje || 0,
                discountValue: originalObject?.DescripcionDescuentosPesos?.valorDescuento || 0,
                totalValue: originalObject?.DescripcionDescuentosPesos?.valorTotal || 0
            }
        }
    }

    return (
      <PaymentStatus 
        payment={paymentDetails}
        dataSummary={dataSummary}
        status={status}
        onRetry={handleRetry}
        voucher={dataVoucher?.voucher}
        pathResponse={pathResponse}
      />
    );
};
  
export default BillingResultPage;