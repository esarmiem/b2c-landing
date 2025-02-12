import {Input} from "@/components/ui/input.tsx";
import {PhoneNumberForm} from "@/TravelCore/Components/Epic/PhoneNumberForm.tsx";

export function EmergencyContact() {

  const namePhone = [
    { id: 1, phone: "Teléfono" },
    { id: 2, phone: "Teléfono 2 (Opcional)" }
  ]

  return (
    <section className="space-y-4 pb-4">
      <div className="px-4 py-1">
        <h2 className="text-2xl font-extrabold text-[#B91C1C]">Contacto de emergencia</h2>
      </div>

      <div className="space-y-4 px-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-500 text-sm mb-1">Nombre(s)</label>
            <Input placeholder="Ingrese su nombre" className="rounded-3xl border-gray-300 p-6" />
          </div>
          <div>
            <label className="block font-semibold text-gray-500 text-sm mb-1">Apellidos</label>
            <Input placeholder="Ingrese su apellido" className="rounded-3xl border-gray-300 p-6" />
          </div>
          {namePhone.map((phone) => (
            <div key={phone.id}>
              <PhoneNumberForm celType={(phone.phone)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}