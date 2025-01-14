import { TravelForm } from './TravelForm.tsx';

export const Hero = () => {
  return (
    <div className="bg-primary text-white py-16 px-6 rounded-b-hero">
      <div className="max-w-container mx-auto">
        <nav className="mb-8 text-sm flex items-center space-x-2 text-orange-100">
          <span>Inicio</span>
          <span>›</span>
          <span>Asistencia y seguro de viaje</span>
        </nav>
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Seguro de Viaje</h1>
          <p className="text-lg text-orange-100">
            Contigo hasta que vuelvas. Compara las coberturas de cancelación 
            de vuelos, pérdida de equipaje y mucho más.
          </p>
        </div>
        
        <TravelForm />
      </div>
    </div>
  );
};