import { useEffect, useState } from "react";
import { Auth } from "../model/auth_entity";
import { Masters } from "../model/masters_entity";
import useSession from "../../../TravelCore/Hooks/useSession";
import useMasters from "../../../TravelCore/Hooks/useMasters";
// Components
import { Certifications } from "@/TravelCore/Components/Epic/productsPage/Certifications";
import { Features } from "@/TravelCore/Components/Epic/productsPage/Features";
import { Testimonials } from "@/TravelCore/Components/Epic/productsPage/Testimonials";
import { Stats } from "@/TravelCore/Components/Epic/productsPage/Stats";
import { HeroCarousel } from "@/TravelCore/Components/Epic/productsPage/HeroCarousel";
import { TravelForm } from "@/TravelCore/Components/Epic/productsPage/TravelForm";
import { WhyChooseUs } from "@/TravelCore/Components/Epic/productsPage/WhyChooseUs";

interface AuthResponse {
  data?: {
    payload: { accessToken: string };
    user: { role: string; idUser: string };
  };
  error?: boolean;
}

export default function HomePage () {
  const { setSession } = useSession() || {};
  const masterContext = useMasters();
  const [, setIsAuth] = useState(false);

  useEffect(() => {
    handleInitialization();
  }, []);

  const handleInitialization = async () => {
    const isAuthenticated = await getAuthentication();
    if (isAuthenticated) {
      await getMasters();
    }
  };

  const getAuthentication = async (): Promise<boolean> => {
    try {
      const auth = new Auth();
      const response: AuthResponse = await auth.login();

      if (response?.data && !response.error) {
        const sessionData = {
          token: response.data.payload.accessToken,
          role: JSON.stringify(response.data.user.role),
          user_id: response.data.user.idUser,
        };

        setSession?.(sessionData);
        setIsAuth(true);
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

  return (
    <>
      <HeroCarousel />
      <TravelForm />
      <WhyChooseUs />
      <Certifications />
      <Features />
      <Testimonials />
      <Stats />
    </>
  );
}