import { useEffect, useState } from "react";
import { Auth } from "../model/auth_entity";
import { Masters } from "../model/masters_entity";
import useSession from "../../../TravelCore/Hooks/useSession";
import useMasters from "../../../TravelCore/Hooks/useMasters.ts";
// Components
import { Certifications } from "@/TravelCore/Components/Epic/productsPage/Certifications";
import { Features } from "@/TravelCore/Components/Epic/productsPage/Features";
import { Testimonials } from "@/TravelCore/Components/Epic/productsPage/Testimonials";
import { Stats } from "@/TravelCore/Components/Epic/productsPage/Stats";
import { HeroCarousel } from "@/TravelCore/Components/Epic/productsPage/HeroCarousel";
import { TravelForm } from "@/TravelCore/Components/Epic/productsPage/TravelForm.tsx";
import { WhyChooseUs } from "@/TravelCore/Components/Epic/productsPage/WhyChooseUs.tsx";

// Define types for the possible results of authentication responses
interface AuthResponse {
  data?: any;
  error?: boolean;
}

const HomePage = () => {
  const { setSession, token } = useSession() || {};
  const {
    setArrivals,
    setCountries,
    setDocuments,
    setMedicals,
    setParameters,
    setProducts,
    setQuestions
  } = useMasters() || {};
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Perform the phantom login required for travelkit to operate
    console.log("useEffect HomeViewPage:", token);
    getAuthentication();
  }, []);

  useEffect(() => {
    // Fetch the common lists used by the front end
    console.log("token HomeViewPage");
    getMasters();
  }, [isAuth]); // The trigger for these actions is the token retrieved during the phantom login

  const getAuthentication = async (): Promise<void> => {
    const auth = new Auth();
    const responseLogin: AuthResponse = await auth.login();
    console.log("getAuthentication responseLogin: ", responseLogin);
    if (responseLogin && responseLogin.data && !responseLogin.error) {
      console.log("getAuthentication received: ", responseLogin.data);
      let sessionData: { token?: string; role?: string; user_id?: string } = {};
      sessionData["token"] = responseLogin.data.payload.accessToken;
      sessionData["role"] = JSON.stringify(responseLogin.data.user.role);
      sessionData["user_id"] = responseLogin.data.user.idUser;
      setIsAuth(true);
      setSession?.(sessionData);
    } else {
      console.log("getAuthentication failed");
    }
  }

  const getMasters = async (): Promise<void> => {
    const masters = new Masters();
    console.log("enter getMasters");

    try {
      const responses: any[] = await Promise.all([
        masters.getCountries(),
        masters.getArrivalDestinations(),
        masters.getQuestions(),
        masters.getMedicalConditions(),
        masters.getDocumentTypes(),
        masters.getProducts(),
        masters.getParameters()
      ]);

      const [countries, arrivals, questions, medicalConditions, documentTypes, products, parameters] = responses;

      if (countries && arrivals && questions && medicalConditions && documentTypes && products && parameters) {
        setArrivals?.(arrivals.data);
        setQuestions?.(questions.data);
        setMedicals?.(medicalConditions.data);
        setDocuments?.(documentTypes.data);
        setProducts?.(products.data);
        setParameters?.(parameters.data);
        setCountries?.(countries.data);
      }

    } catch (error) {
      console.log("getMasters failed", error);
    }
  }

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
};

export default HomePage;