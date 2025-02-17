import useSession from "@/TravelCore/Hooks/useSession.ts";
import useMasters from "@/TravelCore/Hooks/useMasters.ts";
import {useEffect} from "react";
import {Auth} from "@/TravelFeatures/Home/model/auth_entity.ts";
import {Masters} from "@/TravelFeatures/Home/model/masters_entity.ts";

import {TravelAssistance} from "@/TravelFeatures/Home/model/travel_assistance_entity.ts";
import {dataOrder} from "@/TravelCore/Utils/interfaces/Order.ts";
import useData from "@/TravelCore/Hooks/useData.ts";
import {StateKey} from "@/TravelCore/Utils/interfaces/context.ts";

interface AuthResponse {
  data?: {
    payload: { accessToken: string };
    user: { role: string; idUser: string };
  };
  error?: boolean;
}

export default function useHomeState () {
  const {setSession} = useSession() || {};
  const {setData} = useData() || {};
  const masterContext = useMasters();

  //Auth execution
  useEffect(() => {
    const handleInitialization = async () => {
      const isAuthenticated = await validateOrGetAuthentication();
      if (isAuthenticated) {
        await getMasters();
      }
    };

    handleInitialization();
  }, []);

  const validateOrGetAuthentication = async (): Promise<boolean> => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedTokenExpiration = localStorage.getItem('tokenExpiration');

      const now = new Date().getTime();

      if (storedToken && storedTokenExpiration && now < parseInt(storedTokenExpiration, 10)) {
        console.log("Token válido, no se requiere nueva autenticación.");
        return true;
      }

      console.log("Token inválido o expirado, realizando nueva autenticación...");
      const auth = new Auth();
      const response: AuthResponse = await auth.login();

      if (response?.data && !response.error) {
        const sessionData = {
          token: response.data.payload.accessToken,
          role: JSON.stringify(response.data.user.role),
          user_id: response.data.user.idUser,
        };

        const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;

        localStorage.setItem('token', sessionData.token);
        localStorage.setItem('tokenExpiration', expirationTime.toString());

        setSession?.(sessionData);

        return true;
      }
    } catch (error) {
      console.error("Error durante la autenticación:", error);
    }

    return false;
  }

  //Get all data from masters
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
        const typedKey = key as StateKey;

        if (masterContext && !masterContext[typedKey]?.data) {
          const response = await fetchFn();
          if (response?.data) {
            masterContext[typedKey].setData(response.data);
          }
        }
      });

      await Promise.all(loadDataPromises);
    } catch (error) {
      console.error("Failed to load master data:", error);
    }
  }

  //Get data from order
  const HandleGetOrder = async (orderPayload: dataOrder) => {
    const travelAssistance = new TravelAssistance();
    try {
      const response = await travelAssistance.getOrderPriceByAge(orderPayload);
      if (response && response?.data?.planes && response?.data?.planes.length > 0 && response?.data?.idProspecto) {
        setData?.((prevData) => ({
            ...prevData,
            responseOrder: response?.data
          })
        )
        return  response.data.idProspecto

      }
      return null
    } catch (error) {
      console.error("Failed to get order:", error);
    }
  }

  const isDataOrderValid = (order: dataOrder): boolean => {
    return Object.values(order).every(value => {
      if (value === null || value === undefined) {
        return false;
      }
      if (typeof value === 'string' && value.trim() === '') {
        return false;
      }
      if (Object.keys(order).length !== 11) {
        return false;
      }
      return true;
    });
  }

  return ({HandleGetOrder, isDataOrderValid})
}