import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {PhoneNumberForm} from "@/TravelCore/Components/Epic/PhoneNumberForm.tsx";
import {useState} from "react";

export function BillingForm() {

  const [usePassengerInfo, setUsePassengerInfo] = useState(false)

  return (
    <>
      <section className="p-4">
        <h2 className="mb-4 font-bold text-lg">
          Selecciona uno de los pasajeros como titular de los datos de facturación:
        </h2>
        <div className="flex items-center space-x-2">
          <Input
            type="checkbox"
            id="usePassengerInfo"
            checked={usePassengerInfo}
            onChange={(e) => setUsePassengerInfo(e.target.checked)}
            className="h-3 w-3 rounded border-gray-300"
          />
          <label htmlFor="usePassengerInfo" className="text-sm font-medium text-gray-700">
            Usar la misma información del Pasajero 1 para la facturación
          </label>
        </div>
      </section>

      <section className="space-y-4 p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-500 text-sm mb-1">Nombre(s)</label>
            <Input placeholder="Ingrese su nombre" className="rounded-3xl border-gray-300 p-6" />
          </div>
          <div>
            <label className="block font-semibold text-gray-500 text-sm mb-1">Apellidos</label>
            <Input placeholder="Ingrese su apellido" className="rounded-3xl border-gray-300 p-6" />
          </div>
          <div>
            <label className="block font-semibold text-gray-500 text-sm mb-1">Tipo de documento</label>
            <Select>
              <SelectTrigger className="rounded-3xl border-gray-300 p-6">
                <SelectValue placeholder="Seleccione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cc">Cédula de Ciudadanía</SelectItem>
                <SelectItem value="ce">Cédula de Extranjería</SelectItem>
                <SelectItem value="passport">Pasaporte</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block font-semibold text-gray-500 text-sm mb-1">No. de documento</label>
            <Input placeholder="Número de documento" className="rounded-3xl border-gray-300 p-6" />
          </div>
          <PhoneNumberForm celType="Teléfono" />
          <div>
            <label className="block font-semibold text-gray-500 text-sm mb-1">Correo electrónico</label>
            <Input type="email" placeholder="correo@ejemplo.com" className="rounded-3xl border-gray-300 p-6" />
          </div>
        </div>
        <div className="grid gap-4">
          <div className="space-y-2">
            <label className="block font-semibold text-gray-500 text-sm mb-1">
              País de facturación
            </label>
            <Input
              type="text"
              className="w-full rounded-3xl border border-gray-300 text-base p-6"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-semibold text-gray-500 text-sm mb-1">
              Ciudad de facturación
            </label>
            <Select>
              <SelectTrigger className="rounded-3xl border-gray-300 p-6">
                <SelectValue placeholder="Bogotá" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bogota">Bogotá</SelectItem>
                <SelectItem value="medellin">Medellín</SelectItem>
                <SelectItem value="cali">Cali</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="block font-semibold text-gray-500 text-sm mb-1">
              Dirección de facturación
            </label>
            <Input
              type="text"
              id="address"
              name="address"
              placeholder="Calle 123 #45-67"
              required
              className="w-full rounded-3xl border border-gray-300 text-base p-6"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-semibold text-gray-500 text-sm mb-1">
              Información adicional
            </label>
            <Input
              type="text"
              id="additional"
              name="additional"
              placeholder="Apartamento, suite, unidad, etc."
              className="w-full rounded-3xl border border-gray-300 text-base p-6"
            />
          </div>
        </div>
      </section>
    </>
  )
}