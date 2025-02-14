import useSession from "@/TravelCore/Hooks/useSession.ts";
import useMasters from "@/TravelCore/Hooks/useMasters.ts";
import {useEffect} from "react";
import {Auth} from "@/TravelFeatures/Home/model/auth_entity.ts";
import {AuthISL} from "@/TravelFeatures/Home/model/auth_isl_entity.ts";
import {Masters} from "@/TravelFeatures/Home/model/masters_entity.ts";

import {TravelAssistance} from "@/TravelFeatures/Home/model/travel_assistance_entity.ts";
import {dataOrder} from "@/TravelCore/Utils/interfaces/Order.ts";
import useOrder from "@/TravelCore/Hooks/useOrder.ts";

interface AuthResponse {
  data?: {
    payload: { accessToken: string };
    user: { role: string; idUser: string };
  };
  error?: boolean;
}

export default function useHomeState () {
  const {setSession} = useSession() || {};
  const {order, setOrder} = useOrder() || {};

  const masterContext = useMasters();

  useEffect(() => {
    const handleInitialization = async () => {
      const isAuthenticated = await getAuthentication();
      if (isAuthenticated) {
        await getMasters();
      }
    }

    handleInitialization();
  }, []);

  const getAuthentication = async (): Promise<boolean> => {
    try {

      const auth = new Auth();
      const response: AuthResponse = await auth.login();

      const authISL = new AuthISL();
      const responseISL = await authISL.loginISL();

      if (response?.data && responseISL?.data && !response.error && !responseISL.error) {
        const sessionData = {
          token: response.data.payload.accessToken,
          role: JSON.stringify(response.data.user.role),
          user_id: response.data.user.idUser,
          token_isl: responseISL.data.result.token
        };

        setSession?.(sessionData);
        return true;
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }
    return false;
  };

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
      const loadDataPromises = Object.entries(masterDataMap).map(async ([key, fetchFn]) => {

        if (!masterContext?.[key]?.data) {
          const response = await fetchFn();
          if (response?.data) {
            (masterContext as any)[key].setData(response.data);
          }
        }
      });
      await Promise.all(loadDataPromises);
    } catch (error) {
      console.error("Failed to load master data:", error);
    }
  };

  const getOrder = async ({orderPayload}: {orderPayload: dataOrder}) => {
    const travelAssistance = new TravelAssistance();
    try {
      const response = await travelAssistance.getOrderPriceByAge(orderPayload);
      if (response?.planes && response?.planes.length > 0 && response?.idProspecto) {
        setOrder?.(response);
      }
    } catch (error) {
      console.error("Failed to get order:", error);
  }}

  return (
    {
      getOrder,
      order
    }
  )
}