import {useEffect, useState} from "react";
import {Auth} from "../model/auth_entity";
import {Masters} from "../model/masters_entity";
import useSession from "../../../TravelCore/Hooks/useSession";
import useMasters from "../../../TravelCore/Hooks/useMasters.ts";

import { Certifications } from "../../../TravelCore/Components/Epic/productsPage/Certifications";
import { Features } from "../../../TravelCore/Components/Epic/productsPage/Features";
import { Testimonials } from "../../../TravelCore/Components/Epic/productsPage/Testimonials";
import { Stats } from "../../../TravelCore/Components/Epic/productsPage/Stats";
import { HeroCarousel } from "../../../TravelCore/Components/Epic/productsPage/HeroCarousel";

// Definir tipos para los posibles resultados de las respuestas de autenticación y masters
interface AuthResponse {
  data?: any;
  error?: boolean;
}

interface MastersResponse {
  data?: any;
  error?: boolean;
}

const HomeViewPage = () => {
  const {session, setSession, token} = useSession();
  const {
    arrivals, setArrivals,
    countries, setCountries,
    documents, setDocuments,
    medicals, setMedicals,
    parameters, setParameters,
    products, setProducts,
    questions, setQuestions
  } = useMasters()
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Hacer el login fantasma que requiere travelkit para operar
    console.log("useEffect HomeViewPage:", token);
    getAuthentication();
  }, []);

  useEffect(() => {
    // Traer las listas comunes que usa el front
    console.log("token HomeViewPage");
    getMasters();
  }, [isAuth]); // Lo que desencadena estas acciones es el token recuperado al hacer el login fantasma*/

  const getAuthentication = async (): Promise<void> => {
    const auth = new Auth();
    const responseLogin: AuthResponse = await auth.login();
    console.log("getAuthentication responseLogin: ", responseLogin);
    if (responseLogin && responseLogin.data && !responseLogin.error) {
      console.log("getAuthentication recibida: ", responseLogin.data);
      let sessionData = {}
      sessionData["token"] = responseLogin.data.payload.accessToken
      sessionData["role"] = JSON.stringify(responseLogin.data.user.role)
      sessionData["user_id"] = responseLogin.data.user.idUser
      setIsAuth(true);
      setSession(sessionData)
    } else {
      console.log("falló getAuthentication");
    }
  }

  const getMasters = async (): Promise<void> => {
    const masters = new Masters();
    console.log("enter getMasters");

    try {
      const [countries, arrivals, questions, medicalConditions, documentTypes, products, parameters]: MastersResponse = await Promise.all([
        masters.getCountries(),
        masters.getArrivalDestinations(),
        masters.getQuestions(),
        masters.getMedicalConditions(),
        masters.getDocumentTypes(),
        masters.getProducts(),
        masters.getParameters()
      ]);

      if (countries && arrivals && questions && medicalConditions && documentTypes && products && parameters) {
        setArrivals(arrivals.data);
        setQuestions(questions.data);
        setMedicals(medicalConditions.data);
        setDocuments(documentTypes.data);
        setProducts(products.data);
        setParameters(parameters.data);
        setCountries(countries.data);
      }

    } catch (error) {
      console.log("falló getMasters", error);
    }
  }

  const handleQuote = async (): Promise<void> => {
      console.log("Click Cotizar");
  };

  return (
    <>
      <p>Home formulario para empezar a cotizar</p>
      <button onClick={handleQuote}>Cotizar</button>
      <div>Response</div>
      {/*<div>{countries.map(city => {*/}
      {/*  return <p key={city.idPais}>{city.descripcion}</p>*/}
      {/*})}</div>*/}
    </>
  );
};

export default HomeViewPage;
