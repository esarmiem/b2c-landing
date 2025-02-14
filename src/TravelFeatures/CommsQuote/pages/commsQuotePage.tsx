
const CommsQuotePage: React.FC = () => {

    const handleSelectPlan = async (): Promise<void> => {
        console.log('Plan x seleccionado, redirigir al detalle de la compra')
    };

    return (
        <>
            <p>Ver planes de sim cards filtrados</p>
            <button onClick={handleSelectPlan}>Lo quiero</button>
            <button>Ver modal de detalles</button>
        </>
    );
};

export default CommsQuotePage;
