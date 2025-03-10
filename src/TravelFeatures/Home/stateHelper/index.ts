import useData from '@/TravelCore/Hooks/useData.ts'
import useMasters from '@/TravelCore/Hooks/useMasters.ts'
import useSession from '@/TravelCore/Hooks/useSession.ts'
import type { dataOrder, Plan } from '@/TravelCore/Utils/interfaces/Order.ts'
import type { StateKey } from '@/TravelCore/Utils/interfaces/context.ts'
import { Auth } from '@/TravelFeatures/Home/model/auth_entity.ts'
import { Masters } from '@/TravelFeatures/Home/model/masters_entity.ts'
import { TravelAssistance } from '@/TravelFeatures/Home/model/travel_assistance_entity.ts'
import { useEffect } from 'react'

/**
 * AuthResponse
 *
 * Spanish:
 * Define la estructura de la respuesta de autenticación.
 *
 * English:
 * Defines the structure of the authentication response.
 */
interface AuthResponse {
  data?: {
    payload: { accessToken: string }
    user: { role: string; idUser: string }
  }
  error?: boolean
}

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
const useHomeState = () => {
  // Obtener la función para establecer la sesión y la data del pedido.
  // Get the function to set the session and order data.
  const masterContext = useMasters()
  const { setSession } = useSession() || {}
  const { setData } = useData() || {}

  useEffect(() => {
    const initialize = async () => {
      const isAuthenticated = await validateOrGetAuthentication()
      if (isAuthenticated) {
        await getMasters()
      }
    }
    initialize()
  }, [])

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
  const validateOrGetAuthentication = async (): Promise<boolean> => {
    try {
      const auth = new Auth()
      const response: AuthResponse = await auth.login()

      if (response?.data && !response.error) {
        const sessionData = {
          token: response.data.payload.accessToken,
          role: JSON.stringify(response.data.user.role),
          user_id: response.data.user.idUser
        }

        setSession?.(sessionData)
        sessionStorage.setItem('token', response.data.payload.accessToken)
        return true
      }
    } catch (error) {
      console.error('Error durante la autenticación:', error)
    }
    return false
  }
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
  const getMasters = async () => {
    const masters = new Masters()
    const masterDataMap = {
      countries: masters.getCountries,
      arrivals: masters.getArrivalDestinations,
      questions: masters.getQuestions,
      medicals: masters.getMedicalConditions,
      documents: masters.getDocumentTypes,
      products: masters.getProducts,
      parameters: masters.getParameters
    }

    try {
      const loadDataPromises = Object.entries(masterDataMap).map(async ([key, fetchFn]) => {
        const typedKey = key as StateKey

        if (masterContext && !masterContext[typedKey]?.data) {
          const response = await fetchFn()
          if (response?.data) {
            masterContext[typedKey].setData(response.data)
          }
        }
      })

      await Promise.all(loadDataPromises)
    } catch (error) {
      console.error('Failed to load master data:', error)
    }
  }
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

  const HandleGetOrder = async (orderPayload: dataOrder): Promise<string | null> => {
    const travelAssistance = new TravelAssistance()
    try {
      // Calculate the difference in days between the departure and arrival dates
      const salida = orderPayload.salida ? new Date(orderPayload.salida.split('/').reverse().join('-')) : null
      const llegada = orderPayload.llegada ? new Date(orderPayload.llegada.split('/').reverse().join('-')) : null
      const daysDifference = salida && llegada ? Math.floor((llegada.getTime() - salida.getTime()) / (1000 * 60 * 60 * 24)) : 0

      // Determine the question number based on the days difference
      const numerosPreguntas = []
      if (daysDifference >= 3 && daysDifference < 120) numerosPreguntas.push(1)
      if (daysDifference >= 30 && daysDifference < 364) numerosPreguntas.push(2)
      if (daysDifference >= 90 && daysDifference <= 364) numerosPreguntas.push(3)
      if (daysDifference === 364) numerosPreguntas.push(4)

      // There are no valid questions
      if (numerosPreguntas.length === 0) return null

      // Create a combined data object
      const combinedData = {
        planes: [] as Plan[],
        idProspecto: 0
      }

      // Process each question sequentially instead of in parallel
      for (const numeroPregunta of numerosPreguntas) {
        let attempts = numeroPregunta === numerosPreguntas[0] ? 3 : 1
        let success = false
        let delay = 1000

        while (attempts > 0 && !success) {
          try {
            if (attempts < 3 && numeroPregunta === numerosPreguntas[0]) {
              await new Promise(resolve => setTimeout(resolve, delay))
              delay *= 2
            }

            const response = await travelAssistance.getOrderPriceByAge({ ...orderPayload, numeroPregunta })

            if (response?.data?.planes && response.data.planes.length > 0) {
              // Save the prospect ID in the first response
              if (!combinedData.idProspecto && response.data.idProspecto) {
                combinedData.idProspecto = response.data.idProspecto
              }

              // Add plans that are not already in the combined data
              const existingPlaneIds = new Set(combinedData.planes.map(p => p.IdPlan))
              const newPlanes = response.data.planes.filter(p => !existingPlaneIds.has(p.IdPlan))
              combinedData.planes.push(...newPlanes)
              success = true
            }
          } catch (requestError) {
            console.error(`Error en solicitud para numeroPregunta=${numeroPregunta}, intento ${4 - attempts}:`, requestError)
            attempts--
            if (attempts === 0) {
              console.log(`Todos los intentos fallaron para numeroPregunta=${numeroPregunta}`)
            }
          }
        }
      }

      // Verify that the combined data is valid
      if (combinedData.planes.length > 0 && combinedData.idProspecto) {
        setData?.(prevData => ({
          ...prevData,
          responseOrder: combinedData
        }))
        return String(combinedData.idProspecto)
      }
      return null
    } catch (error) {
      console.error('Error al obtener los planes:', error)
      return null
    }
  }

  const isDataOrderValid = (order: dataOrder): boolean => {
    return Object.values(order).every(value => {
      if (value === null || value === undefined) {
        return false
      }
      if (typeof value === 'string' && value.trim() === '') {
        return false
      }
      if (Object.keys(order).length !== 11) {
        return false
      }
      return true
    })
  }

  return { HandleGetOrder, isDataOrderValid }
}
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
export default useHomeState
