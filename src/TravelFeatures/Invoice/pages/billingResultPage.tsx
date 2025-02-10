import { PaymentStatus } from "@/TravelCore/Components/Epic/PaymentStatus"

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
