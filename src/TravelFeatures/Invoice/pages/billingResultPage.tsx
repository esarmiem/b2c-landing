import { PaymentStatus } from "@/TravelCore/Components/Epic/PaymentStatus"
import { useSearchParams } from "react-router-dom";

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
    const refPayco = searchParams.get("ref_payco");

    //estados, status: "Cotizado|Pendiente|Pagado|Rechazado"

console.log('respuesta: ', searchParams, refPayco)

    //TODO: 1 consumir servicio: `${process.env.REACT_APP_API_URL}/api/v1/epayco/details/${refPayco}`
    //TODO: 2 consumir servicio: `${process.env.REACT_APP_API_URL}/api/v1/asistencias/descargarVoucher/${idSale}`
    //TODO: 3 consumir servicio: `${process.env.REACT_APP_API_URL}/api/v1/asistencias/resumenCompra/${idSale}`
    //TODO: 4 dejar que el cliente copie la url de respuesta:   pathResponse = `${process.env.REACT_APP_RESPONSE_PAY_PLATTFORM_URL}?x_extra1=${idSale}`;


    const handleDownloadVoucher = async () => {
      // Implement voucher download logic here
      console.log("Downloading voucher...");
    };
  
    const handleRetry = () => {
      // Implement retry logic here
      console.log("Retrying payment...");
    };
  
    return (
      <PaymentStatus 
        payment={paymentData} 
        onRetry={handleRetry} 
        onDownloadVoucher={handleDownloadVoucher} 
      />
    );
  };
  
  export default BillingResultPage;
