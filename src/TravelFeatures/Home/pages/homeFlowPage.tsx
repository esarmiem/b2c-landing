/*import { useEffect } from "react";
import { Masters } from "../model/masters_entity";
import { Auth } from "../model/auth_entity";*/

import { Certifications } from "../../../TravelCore/Components/Epic/productsPage/Certifications";
import { Features } from "../../../TravelCore/Components/Epic/productsPage/Features";
import { Testimonials } from "../../../TravelCore/Components/Epic/productsPage/Testimonials";
import { Stats } from "../../../TravelCore/Components/Epic/productsPage/Stats";

// Definir tipos para los posibles resultados de las respuestas de autenticación y masters
/*interface AuthResponse {
    data?: any;
    error?: boolean;
}

interface MastersResponse {
    data?: any;
    error?: boolean;
}*/

const HomeViewPage: React.FC = () => {
  /*useEffect(() => {
        // Hacer el login fantasma que requiere travelkit para operar
        getAuthentication();
    }, []);

    useEffect(() => {
        // Traer las listas comunes que usa el front
        getMasters();
    }, []); // Lo que desencadena estas acciones es el token recuperado al hacer el login fantasma*/

  /* const getAuthentication = async (): Promise<void> => {
        const auth = new Auth();
        const responseLogin: AuthResponse = await auth.login();
        if (responseLogin && responseLogin.data && !responseLogin.error) {
            console.log("getAuthentication recibida: ", responseLogin.data);
        } else {
            console.log("falló getAuthentication");
        }
    };*/

  /* const getMasters = async (): Promise<void> => {
        // TODO: Traer todas las listas del backend usando promesas en paralelo
        const masters = new Masters();
        const responseCountries: MastersResponse = await masters.getCountries();
        if (responseCountries && responseCountries.data && !responseCountries.error) {
            console.log("getCountries recibidas: ", responseCountries.data);
        } else {
            console.log("falló getCountries");
        }
    };*/

  //   const handleQuote = async (): Promise<void> => {
  //     console.log("Click Cotizar");
  //   };

  return (
    <>
      <Certifications />
      <Features />
      <Testimonials />
      <Stats />
    </>
  );
};

export default HomeViewPage;
