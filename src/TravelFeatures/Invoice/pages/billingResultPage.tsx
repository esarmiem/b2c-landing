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

                // Map ePayco status to our internal status
                const ePaycoStatus = respDetails?.data?.result?.data?.x_response || "Rechazado"
                let mappedStatus = "Rechazado"
                
                // Map the ePayco status to our application status
                if (ePaycoStatus === "Aprobada" || ePaycoStatus === "Aceptada") {
                    mappedStatus = "Aprobado"
                } else if (ePaycoStatus === "Pendiente") {
                    mappedStatus = "Pendiente"
                }
                
                // Actualizar detalles de pago con datos de la respuesta
                setPaymentDetails({
                    orderNumber: respDetails?.data?.result?.data?.x_id_invoice || "",
                    organizationId: respDetails?.data?.result?.data?.x_business_nit || "",
                    invoiceNumber: respDetails?.data?.result?.data?.x_id_invoice || "",
                    product: "asistencia de viaje internacional",
                })

                // Si no hay un estado en la respuesta de ePayco, usar el mappedStatus
                const respSummary = await payment.purchaseSummary(idSale)
                const adaptedData = adapterPurchaseSummaryResp(respSummary, mappedStatus)
                setDataSummary(adaptedData)

                // Solo intentar descargar el voucher si el estado es Aprobado
                if (mappedStatus === "Aprobado") {
                    const respDownloader = await payment.downloadVoucher(idSale)
                    setDataVoucher(respDownloader)
                }
            }
        } catch (error) {
            console.error("Error fetching payment details:", error)
            setStatus("Rechazado")
        }
    }
  
    const handleRetry = () => {
      // Si estamos en estado pendiente, solo recargamos la página para verificar el estado
      if (status === "Pendiente") {
        window.location.reload()
      } else {
        // Si el pago fue rechazado, implementar lógica para reintentar el pago
        console.log("Retrying payment...");
        // Aquí puedes redirigir al usuario a la página de pago o implementar
        // tu lógica específica para reintentar el pago
      }
    };

    const adapterPurchaseSummaryResp = (originalObject: any, mappedStatus?: string) => {
        // Actualiza el estado global
        // Prioriza el estado del objeto si existe, si no usa el mappedStatus o "Rechazado" por defecto
        const paymentStatus = originalObject?.venta?.estado || mappedStatus || "Rechazado"
        setStatus(paymentStatus)
        
        return {
            travelersNumber: originalObject?.venta?.numeroViajeros || 0,
            valueCOP: originalObject?.venta?.valorProductoPesos || 0,
            value: originalObject?.venta?.valorProductoDolares || 0,
            passengerValueCOP: originalObject?.venta?.valorViajeroPesos || 0,
            passengerValue: originalObject?.venta?.valorViajeroDolares || 0,
            upgrades: originalObject?.detalleUpgrades?.map((item: any) => {
                return {
                    name: item.upgrade || "",
                    value: item.valorUSD || 0,
                    valueCOP: item.valorCOP || 0,
                    passengers: item.pasajeros || 0,
                };
            }) || [],
            totalUpgrades: originalObject?.venta?.totalUpgradesPesos || 0,
            totalOrderCOP: originalObject?.venta?.totalVentaPesos || 0,
            totalOrderUSD: originalObject?.venta?.totalVentaDolares || 0,
            status: paymentStatus,
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