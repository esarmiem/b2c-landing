const ProductsPage: React.FC = () => {

    const handleGoTravel = async (): Promise<void> => {
        console.log("Click en producto seguro de viaje");
    };

    const handleGoComms = async (): Promise<void> => {
        console.log("Click en producto comunicaciones");
    };

    return (
        <>
            <p>Landing Listado de productos travelkit</p>
            <button onClick={handleGoTravel}>Seguro de viaje</button>
            <button onClick={handleGoComms}>Comunicacion</button>
        </>
    );
};

export default ProductsPage;
