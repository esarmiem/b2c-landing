import useSession from "@/TravelCore/Hooks/useSession.ts";
import useMasters from "@/TravelCore/Hooks/useMasters.ts";
import { useEffect } from "react";
import { Auth } from "@/TravelFeatures/Home/model/auth_entity.ts";
import { AuthISL } from "@/TravelFeatures/Home/model/auth_isl_entity.ts";
import { Masters } from "@/TravelFeatures/Home/model/masters_entity.ts";

import { TravelAssistance } from "@/TravelFeatures/Home/model/travel_assistance_entity.ts";
import { dataOrder } from "@/TravelCore/Utils/interfaces/Order.ts";
import useData from "@/TravelCore/Hooks/useData.ts";

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
    payload: { accessToken: string };
    user: { role: string; idUser: string };
  };
  error?: boolean;
}
/**
 * useHomeState
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
export default function useHomeState() {
  // Obtener la función para establecer la sesión y la data del pedido.
  // Get the function to set the session and order data.
  const { setSession } = useSession() || {};
  const { setData } = useData() || {};
  const masterContext = useMasters();
  // Efecto de inicialización: se ejecuta una vez al montar el componente.
  // Initialization effect: runs once when the component mounts.
  useEffect(() => {
    const handleInitialization = async () => {
      const isAuthenticated = await getAuthentication();
      if (isAuthenticated) {
        await getMasters();
      }
    };

    handleInitialization();
  }, []);
  /**
   * GetAuthentication
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
  const getAuthentication = async (): Promise<boolean> => {
    try {
      const auth = new Auth();
      const response: AuthResponse = await auth.login();

      const authISL = new AuthISL();
      const responseISL = await authISL.loginISL();

      if (
        response?.data &&
        responseISL?.data &&
        !response.error &&
        !responseISL.error
      ) {
        const sessionData = {
          token: response.data.payload.accessToken,
          role: JSON.stringify(response.data.user.role),
          user_id: response.data.user.idUser,
          token_isl: responseISL.data.result.token,
        };

        setSession?.(sessionData);
        return true;
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }
    return false;
  };
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
    const masters = new Masters();
    const masterDataMap = {
      countries: masters.getCountries,
      arrivals: masters.getArrivalDestinations,
      questions: masters.getQuestions,
      medicals: masters.getMedicalConditions,
      documents: masters.getDocumentTypes,
      products: masters.getProducts,
      parameters: masters.getParameters,
    };

    try {
      const loadDataPromises = Object.entries(masterDataMap).map(
        async ([key, fetchFn]) => {
          if (!masterContext?.[key]?.data) {
            const response = await fetchFn();
            if (response?.data) {
              (masterContext as any)[key].setData(response.data);
            }
          }
        },
      );
      await Promise.all(loadDataPromises);
    } catch (error) {
      console.error("Failed to load master data:", error);
    }
  };
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
  const HandleGetOrder = async (orderPayload: dataOrder) => {
    const travelAssistance = new TravelAssistance();
    try {
      const response = await travelAssistance.getOrderPriceByAge(orderPayload);
      if (
        response &&
        response?.data?.planes &&
        response?.data?.planes.length > 0 &&
        response?.data?.idProspecto
      ) {
        setData?.((prevData) => ({
          ...prevData,
          responseOrder: response?.data,
        }));
        return response.data.idProspecto;
      }
      return null;
    } catch (error) {
      console.error("Failed to get order:", error);
    }
  };

  return {
    HandleGetOrder,
  };
}
