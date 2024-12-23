
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export const TravelForm = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-form">
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <select className="select-field">
            <option>Colombia</option>
          </select>
        </div>
        
        <div>
          <select className="select-field">
            <option>Destino(s)</option>
          </select>
        </div>
        
        <div className="flex gap-4">
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            placeholderText="Fecha ida"
            className="input-field"
          />
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            placeholderText="Fecha vuelta"
            className="input-field"
          />
        </div>
        
        <div>
          <select className="select-field">
            <option>¿Quiénes viajarán?</option>
          </select>
        </div>
        
        <div className="md:col-span-2">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="input-field"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <img src="/co-flag.png" alt="Colombia" className="w-6 h-4" />
          <input
            type="tel"
            placeholder="+57"
            className="input-field"
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Cotizar
        </button>
      </form>
      
      <p className="text-sm text-gray-500 mt-6 text-center">
        Al continuar estás aceptando nuestros{' '}
        <a href="#" className="text-blue-600 hover:text-blue-700">
          Términos y Condiciones
        </a>
      </p>
    </div>
  );
};