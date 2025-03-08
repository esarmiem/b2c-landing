import { PAYMENT_API } from "@/TravelCore/Services/Apis/Payment";
/**
 * Payment
 *
 * Spanish:
 * Clase que encapsula operaciones relacionadas con los pagos.
 * utilizando el servicio PAYMENT_API.
 *
 * English:
 * Class that encapsulates operations related to payments.
 * using the PAYMENT_API service.
 */
export class Payment {

  async getPaymentDetails(ref: string): Promise<any> {
    return await PAYMENT_API.getPaymentDetails(ref);
  }

  async downloadVoucher(data: any): Promise<any> {
    return await PAYMENT_API.downloadVoucher(data);
  }

  async purchaseSummary(idSale: string): Promise<any> {
    return await PAYMENT_API.purchaseSummary(idSale);
  }
}
