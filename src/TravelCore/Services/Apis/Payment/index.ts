import {
  SERVICE_EPAYCO_DETAILS,
  SERVICE_DOWNLOAD_VOUCHER,
  SERVICE_PURCHASE_RESUMEN
} from '../../../Utils/constants.ts'
import { axiosHttp } from '../../../Utils/http.ts'
import { GET_TOKEN } from '../../../Utils/storage.ts'


/**
 * ASSISTANCE_API
 *
 * Spanish:
 * Objeto que encapsula funciones relacionadas con operaciones de detalles de la compra.
 * Incluye métodos para obtener el detalle de una compra.
 *
 * English:
 * Object that encapsulates functions related to purchase details.
 * It includes methods to fetch the purchase details.
 */
export const PAYMENT_API = {

  getPaymentDetails: (ref: string): Promise<any> => {
    return axiosHttp({
      path: `${SERVICE_EPAYCO_DETAILS}/${ref}`,
      method: 'GET',
      data: null,
      session: { token: GET_TOKEN }
    })
  },
  downloadVoucher: (data: any): Promise<any> => {
    return axiosHttp({
      path: `${SERVICE_DOWNLOAD_VOUCHER}/${data}`,
      method: 'GET',
      data: null,
      session: { token: GET_TOKEN }
    })
  },
  purchaseSummary: (idSale: string): Promise<any> => {
    return axiosHttp({
      path: `${SERVICE_PURCHASE_RESUMEN}/${idSale}`,
      method: 'GET',
      data: null,
      session: { token: GET_TOKEN }
    })
  },
}
