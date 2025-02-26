import useData from '@/TravelCore/Hooks/useData.ts'
import useMasters from '@/TravelCore/Hooks/useMasters.ts'

import {
    CheckPreorderISLResponse,
    dataIslOrder,
    dataPreorder,
    Pax,
    Upgrade
} from "@/TravelCore/Utils/interfaces/Order.ts";
import {DocumentTypeItems} from "@/TravelCore/Utils/interfaces/Document.ts";
import { v4 as uuidv4 } from 'uuid';
import {calculateAge} from "@/TravelCore/Utils/dates.ts";

/**
 * useHomeState
 *
 * Spanish:
 * Hook personalizado para gestionar el estado de la página de facturacion. Este hook se encarga de:
 * - Ejecutar la autenticación del usuario y establecer la sesión.
 * - Cargar los datos maestros (master data) si la autenticación es exitosa.
 * - Proveer funciones para obtener datos de órdenes y validar la carga útil de una orden.
 *
 * English:
 * Custom hook to manage the invoice page state. This hook is responsible for:
 * - Executing user authentication and setting the session.
 * - Loading master data if authentication is successful.
 * - Providing functions to fetch order data and validate the order payload.
 *
 * @returns {Object} Un objeto que contiene las funciones HandleGetOrder e isDataOrderValid.
 *                   / An object containing the HandleGetOrder and isDataOrderValid functions.
 */
export default function useInvoiceState() {
  // Obtener la función para establecer la sesión y la data del pedido.
  // Get the function to set the session and order data.
  const { data, setData } = useData() || {}
  const master = useMasters();
  const documentType = master?.documents.data?.items as DocumentTypeItems[];

    const mapperArrayPax = (travelersData, emergencyContact): Pax[]  => {
        const paxArray: Pax[] = travelersData
            .filter((item): item is NonNullable<typeof item> => item !== undefined)
            .map((item) => ({
                apellidos: item.lastName,
                apellidosContactoEmergencia: emergencyContact.lastName,
                document: item.documentNumber,
                edad: calculateAge(item.birthdate),
                email: item.email,
                idNacionalidad: item.nationality,
                idPais: item.residenceCountry,
                idTipoDocumento: parseInt(item.documentType),
                medical: "",
                nacimientos: item.birthdate,
                nombre: item.firstName,
                nombresContactoEmergencia: emergencyContact.firstName,
                sexo: item.gender,
                telefono1ContactoEmergencia: emergencyContact.phone1,
                telefonos: emergencyContact.phone2
            }));
        return paxArray
    }

  const mapperAddOrder = (preResponse: CheckPreorderISLResponse):dataIslOrder => {
      const savedTravelers = data.travelersData[0]
      const savedOrder = data.payloadOrder
      const savedResponseOrder = data.responseOrder
      const savedQuotation = data.travelerQuotation
      const selectedPlan = savedResponseOrder.planes.find(plan => plan.IdPlan === savedQuotation.productId)

      const order: dataIslOrder = {
          ValorTotalSinDescuentoDolares: selectedPlan.DescripcionDescuentosDolares.valorTotal,
          ValorTotalSinDescuentoPesos: selectedPlan.DescripcionDescuentosPesos.valorTotal,
          consideracionesgenerales: "ninguna",
          detalleUpgrades: [],
          emailcontacto: savedTravelers.email,
          fechallegada: savedOrder.llegada,
          fechasalida: savedOrder.salida,
          idCliente: preResponse.idCliente,
          idDestino: savedOrder.destino,
          idOrigen: savedOrder.pais,
          idProducto: savedOrder.numeroPregunta,
          idProspecto: savedResponseOrder.idProspecto,
          idUser: savedOrder.idUser,
          idplan: savedQuotation.productId,
          moneda: "COP",
          nombrecontacto: savedTravelers.firstName + " " + savedTravelers.lastName,
          numeroViajeros: savedOrder.cantidadPax,
          paisdestino: savedOrder.destino,
          paisorigen: savedOrder.pais,
          pax: mapperArrayPax(data.travelersData, data.emergencyContactData),
          referencia: preResponse.mensaje.referencia,
          telefonocontacto: savedTravelers.countryCode.replace("+", "") + savedTravelers.phone,
          totalUpgradesPesos: 0,
          totalVenta: selectedPlan.ValorPesos,
          totalVentaDolares: selectedPlan.Valor,
          totalVentaPesos: selectedPlan.ValorPesos,
          upgrades: "",
          valorProductoDolares: selectedPlan.Valor,
          valorProductoPesos: selectedPlan.ValorPesos,
          valorViajeroDolares: selectedPlan.ValorPax,
          valorViajeroPesos: selectedPlan.ValorPaxPesos
      }
      return order
  }

  const mapperPreorder = (): dataPreorder => {
      const savedTravelers = data.travelersData[0]
      const savedBilling = data.billingData
      const savedOrder = data.payloadOrder
      const savedResponseOrder = data.responseOrder
      const savedQuotation = data.travelerQuotation

      const preOrder: dataPreorder = {
          consideracionesgenerales: "ninguna",
          correoCliente: savedTravelers.email,
          direccionCliente: savedBilling.address,
          edad: savedOrder.edades,
          emailcontacto: savedTravelers.email,
          fechallegada: savedOrder.llegada,
          fechasalida: savedOrder.salida,
          idCiudadCliente: savedBilling.billingCity,
          idPaisCliente: savedBilling.billingCountry,
          idProspecto: savedResponseOrder.idProspecto,
          idTipoDocumentoCliente: documentType.filter(type => type.estaActivo && type.abreviacion === savedTravelers.documentType)[0]?.idTipoDocumento,
          idUser: savedOrder.idUser,
          idplan: savedQuotation.productId,
          informacionAdicionalCliente: "",
          moneda: "COP",
          nombreCliente: savedTravelers.firstName + " " + savedTravelers.lastName,
          nombrecontacto: savedTravelers.firstName + " " + savedTravelers.lastName,
          numeroDocumentoCliente: savedTravelers.documentNumber,
          paisdestino: savedOrder.destino,
          paisorigen: savedOrder.pais,
          referencia: uuidv4(),
          telefonoCliente: savedTravelers.countryCode + savedTravelers.phone,
          telefonocontacto: savedTravelers.countryCode.replace("+", "") + savedTravelers.phone,
          upgrades: ""
      }
      return preOrder
  }

  return { mapperPreorder, mapperAddOrder }
}
