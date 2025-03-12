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

    useEffect(() => {
        const ref = searchParams.get("ref_payco") || searchParams.get("x_extra1") || ""
        setRefEpayco(ref)
        if (ref !== null && ref !== "")
            getPaymentDetails(ref)
    }, [searchParams])

    const getPaymentDetails = async (ref: string) => {
        const payment = new Payment()
        const respDetails = await payment.getPaymentDetails(ref)
        if (respDetails?.data?.result?.data?.x_extra1) {
            const idSale = respDetails?.data?.result?.data?.x_extra1
            setIdSale(idSale)
            setPathResponse(`${RESPONSE_PAY_PLATTFORM_URL}?x_extra1=${refEPayco}`)

            const respSummary = await payment.purchaseSummary(idSale)
            const adaptedSummary = adapterPurchaseSummaryResp(respSummary)
            setDataSummary(adaptedSummary)

            const respDownloader = await payment.downloadVoucher(idSale)
            setDataVoucher(respDownloader)
        }
    }

    const handleRetry = () => {
        // Implement retry logic here
        console.log("Retrying payment...");
    };

    const adapterPurchaseSummaryResp = (originalObject: any) => {
        const estadoPago = originalObject?.venta?.estado
        setStatus(estadoPago)
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
            status: estadoPago,
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

    // Construir los datos de pago a partir de dataSummary en lugar de usar paymentData estático
    const paymentData = dataSummary ? {
        orderNumber: searchParams.get("x_id_invoice") || "",
        organizationId: searchParams.get("x_extra2") || "",
        invoiceNumber: searchParams.get("x_id_invoice") || "",
        product: "asistencia de viaje internacional",
        pricePerPersonCOP: dataSummary.passengerValueCOP,
        pricePerPersonUSD: dataSummary.passengerValue,
        totalPriceCOP: dataSummary.totalOrderCOP,
        totalPriceUSD: dataSummary.totalOrderUSD,
        status: dataSummary.status,
    } : null;

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