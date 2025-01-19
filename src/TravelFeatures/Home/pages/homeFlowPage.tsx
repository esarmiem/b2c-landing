/*import { useEffect } from "react";
import { Masters } from "../model/masters_entity";
import { Auth } from "../model/auth_entity";*/
import {Masters} from "../model/masters_entity";
import {useEffect, useState} from "react";

// Definir tipos para los posibles resultados de las respuestas de autenticación y masters
/*interface AuthResponse {
    data?: any;
    error?: boolean;
}

interface MastersResponse {
    data?: any;
    error?: boolean;
}*/

const HomeViewPage = () => {
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

    const [countriesList, setCountriesList] = useState<string[]>([]);

        const fetchCountries = async (): Promise<void> => {
            try {
                const countries = new Masters();
                const response = await countries.getCountries();
                if (response && response.data && !response.error) {
                    setCountriesList(response.data);
                    console.log("getCountries recibidas: ", response.data);
                } else {
                    console.log("falló getCountries");
                }
            } catch (error) {
                console.error("Error fetching countries: ", error);
            }
        };


    const handleQuote = async (): Promise<void> => {
        console.log("Click Cotizar");
    };

    return (
        <>
            <p>Home formulario para empezar a cotizar</p>
            <button onClick={handleQuote}>Cotizar</button>
            <div>Response</div>
            <button className={"p-2 bg-grey-600 test-lg"} onClick={fetchCountries}>ensayo</button>
            <ul>
                {countriesList.map((country, index) => (
                    <li key={index}>{country}</li>
                ))}
            </ul>
        </>
    );
};

export default HomeViewPage;
