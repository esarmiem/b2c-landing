/**
 * AuthResponse
 *
 * Spanish:
 * Define la estructura de la respuesta de autenticación.
 *
 * English:
 * Defines the structure of the authentication response.
 */

/**
 * index
 *
 * Spanish:
 * Hook personalizado para gestionar el estado de la página de inicio. Este hook se encarga de:
 * - Ejecutar la autenticación del usuario y establecer la sesión.
 * - Cargar los datos maestros (master data) si la autenticación es exitosa.
 * - Proveer funciones para obtener datos de órdenes y validar la carga útil de una orden.
 *
 * English:
 * Custom hook to manage the home page state. This hook is responsible for:
 * - Executing user authentication and setting the session.
 * - Loading master data if authentication is successful.
 * - Providing functions to fetch order data and validate the order payload.
 *
 * @returns {Object} Un objeto que contiene las funciones HandleGetOrder e isDataOrderValid.
 *                   / An object containing the HandleGetOrder and isDataOrderValid functions.
 */

/**
 * validateOrGetAuthentication
 *
 * Spanish:
 * Función asíncrona que autentica al usuario utilizando la clase Auth. Si la autenticación es exitosa,
 * establece la sesión con el token, rol e identificador de usuario.
 *
 * English:
 * Asynchronous function that authenticates the user using the Auth class. If authentication is successful,
 * it sets the session with the token, role, and user ID.
 *
 * @returns {Promise<boolean>} Una promesa que se resuelve con true si la autenticación es exitosa, de lo contrario false.
 *                             / A promise that resolves to true if authentication is successful, otherwise false.
 */

/**
 * getMasters
 *
 * Spanish:
 * Función asíncrona que carga los datos maestros utilizando la clase Masters. Para cada categoría de datos
 * (países, llegadas, preguntas, condiciones médicas, etc.), se verifica si ya se han cargado en el contexto.
 * Si no es así, se realiza la solicitud para obtener los datos y se actualiza el contexto correspondiente.
 *
 * English:
 * Asynchronous function that loads master data using the Masters class. For each data category
 * (countries, arrivals, questions, medical conditions, etc.), it checks whether the data has already been loaded
 * in the context. If not, it fetches the data and updates the corresponding context.
 */

/**
 * HandleGetOrder
 *
 * Spanish:
 * Función asíncrona que obtiene los datos de una orden utilizando la clase TravelAssistance. Si la respuesta
 * contiene datos válidos (como una lista de planes y un identificador de prospecto), actualiza el contexto de datos
 * y retorna el identificador del prospecto.
 *
 * English:
 * Asynchronous function that fetches order data using the TravelAssistance class. If the response contains valid data
 * (such as a list of plans and a prospect identifier), it updates the data context and returns the prospect ID.
 *
 * @param {dataOrder} orderPayload - La carga útil de la orden. / The order payload.
 * @returns {Promise<any>} Una promesa que se resuelve con el ID del prospecto si la orden es válida, de lo contrario null.
 *                         / A promise that resolves with the prospect ID if the order is valid, otherwise null.
 */

/**
 * index
 *
 * Spanish:
 * Hook personalizado para gestionar el estado de la página de inicio. Este hook se encarga de:
 * - Ejecutar la autenticación del usuario y establecer la sesión.
 * - Cargar los datos maestros (master data) si la autenticación es exitosa.
 * - Proveer funciones para obtener datos de órdenes y validar la carga útil de una orden.
 *
 * English:
 * Custom hook to manage the home page state. This hook is responsible for:
 * - Executing user authentication and setting the session.
 * - Loading master data if authentication is successful.
 * - Providing functions to fetch order data and validate the order payload.
 *
 * @returns {Object} Un objeto que contiene las funciones HandleGetOrder e isDataOrderValid.
 *                   / An object containing the HandleGetOrder and isDataOrderValid functions.
 */

import { useEffect } from 'react'
import { useAuth } from './useAuth'
import { useMasterData } from './useMasterData'
import { useOrderManagement } from './useOrderManagement'
import { useQuote } from './useQuote'

const useHomeState = () => {
  const { authenticate } = useAuth()
  const { loadMasters } = useMasterData()
  const { getOrder, isDataOrderValid } = useOrderManagement()
  const { processQuote, isLoading: isLoadingOrders } = useQuote()

  useEffect(() => {
    const initialize = async () => {
      const isAuthenticated = await authenticate()
      if (isAuthenticated) {
        await loadMasters()
      }
    }
    initialize()
  }, [])

  return {
    HandleGetOrder: getOrder,
    isDataOrderValid,
    handleGetQuote: processQuote,
    isLoadingOrders
  }
}
export default useHomeState
