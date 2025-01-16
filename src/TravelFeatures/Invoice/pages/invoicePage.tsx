import { useEffect } from "react";
import { Order } from "../model/order_entity";
import { Cities } from "../model/cities_entity";

const InvoicePage: React.FC = () => {

    useEffect(() => {
        // Hacer el login fantasma que requiere travelkit para operar
        getCitiesByCountry();
    }, []);

    const getCitiesByCountry = async (): Promise<void> => {
        const cities = new Cities();
        const response: any = await cities.getCitiesByCountry(1233);
        if (response && response.data && !response.error) {
            console.log("getCitiesByCountry recibida: ", response.data);
        } else {
            console.log("falló getCitiesByCountry");
        }
    };

    const handleCheckPreOrder = async (): Promise<void> => {
        const order = new Order();
        const response: any = await order.checkPreOrder({});
        if (response && response.data && !response.error) {
            console.log("handleCheckPreOrder recibidas: ", response.data);
        } else {
            console.log("falló handleCheckPreOrder");
        }
    };

    const handleAddOrder = async (): Promise<void> => {
        const order = new Order();
        const response: any = await order.checkPreOrder({});
        if (response && response.data && !response.error) {
            console.log("handleAddOrder recibidas: ", response.data);
        } else {
            console.log("falló handleAddOrder");
        }
    };

    return (
        <>
            <p>Facturacion y pago</p>
            <button onClick={handleCheckPreOrder}>Confirmar</button>
            <button onClick={handleAddOrder}>Pagar</button>
        </>
    );
};

export default InvoicePage;
