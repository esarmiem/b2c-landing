import {SquareUser} from "lucide-react"
import { Input } from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {PhoneNumberForm} from "@/TravelCore/Components/Epic/PhoneNumberForm.tsx";

export function TravelerForm({traveler}: {traveler: {id: number, age: string, phone: string}}) {

  return (
      <section key={traveler.id} className="space-y-4">
        <div className="bg-[#B91C1C] text-white px-8 py-2 text-sm flex items-center gap-2 rounded-t-xl">
          <SquareUser className="w-6 h-6" />
          <h1 className="font-semibold text-xl">
            Viajero {traveler.id} - {traveler.age}
          </h1>
        </div>

        <div className="space-y-4 p-4">
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
            <div>
              <label className="block font-semibold text-gray-500 text-sm mb-1">Fecha de nacimiento</label>
              <Input type="date" className="rounded-3xl border-gray-300 p-6" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-500 text-sm mb-1">Edad</label>
                <Input disabled value={traveler.age} className="rounded-3xl border-gray-300 p-6" />
              </div>
              <div>
                <label className="block font-semibold text-gray-500 text-sm mb-1">Sexo</label>
                <Select>
                  <SelectTrigger className="rounded-3xl border-gray-300 p-6">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m">Masculino</SelectItem>
                    <SelectItem value="f">Femenino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="block font-semibold text-gray-500 text-sm mb-1">Nacionalidad</label>
              <Select>
                <SelectTrigger className="rounded-3xl border-gray-300 p-6">
                  <SelectValue placeholder="Colombia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="co">Colombia</SelectItem>
                  <SelectItem value="pe">Perú</SelectItem>
                  <SelectItem value="ec">Ecuador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block font-semibold text-gray-500 text-sm mb-1">País de residencia</label>
              <Select>
                <SelectTrigger className="rounded-3xl border-gray-300 p-6">
                  <SelectValue placeholder="Colombia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="co">Colombia</SelectItem>
                  <SelectItem value="pe">Perú</SelectItem>
                  <SelectItem value="ec">Ecuador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <PhoneNumberForm celType={traveler.phone} />
            <div>
              <label className="block font-semibold text-gray-500 text-sm mb-1">Correo electrónico</label>
              <Input type="email" placeholder="correo@ejemplo.com" className="rounded-3xl border-gray-300 p-6" />
            </div>
          </div>
        </div>
      </section>
  )
}