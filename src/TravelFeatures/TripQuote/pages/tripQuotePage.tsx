const TripQuotePage: React.FC = () => {
  const handleSelectPlan = async (): Promise<void> => {
    console.log("Plan x seleccionado, redirigir al detalle de la compra");
  };

  return (
    <>
      <div className="mt-40 text-2xl flex flex-col md:flex-row justify-center items-center font-bold gap-2 mx-auto px-6">
        <p>Ayyyyyyyyyyyyy</p>
        <button onClick={handleSelectPlan}>mandate un carnero</button>
        <button>Brayannnnnnn</button>
      </div>
    </>
  );
};

export default TripQuotePage;
