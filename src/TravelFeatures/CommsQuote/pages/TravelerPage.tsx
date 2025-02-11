import {Breadcrumb} from '@/TravelCore/Components/Epic/Breadcrumb'

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TravelForm() {
  const [travelers, setTravelers] = useState([
    { id: 1, age: "35 Años" },
    { id: 2, age: "20 Años" },
  ])

  return (
    <>
      <Breadcrumb />
    <form className="max-w-7xl mx-auto p-4 grid md:grid-cols-[1fr_350px] gap-6">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" />
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Volver a las coberturas
          </a>
        </div>

        <div>
          <h1 className="text-xl font-semibold mb-2">Datos de los viajeros</h1>
          <p className="text-sm text-gray-600">
            Al ingresar tus datos, aceptas nuestra{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Política de Manejo de Datos y Términos de Uso
            </a>
          </p>
        </div>

        {travelers.map((traveler) => (
          <div key={traveler.id} className="space-y-4">
            <div className="bg-red-600 text-white px-4 py-2 text-sm">
              <h2 className="font-medium">
                Viajero {traveler.id} - {traveler.age}
              </h2>
            </div>
            <div className="space-y-4 p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Nombre(s)</label>
                  <Input placeholder="Ingrese su nombre" className="rounded-xl border-gray-300" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Apellidos</label>
                  <Input placeholder="Ingrese su apellido" className="rounded-xl border-gray-300" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Tipo de documento</label>
                  <Select>
                    <SelectTrigger className="rounded-xl border-gray-300">
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
                  <label className="block text-sm mb-1">No. de documento</label>
                  <Input placeholder="Número de documento" className="rounded-xl border-gray-300" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Fecha de nacimiento</label>
                  <Input type="date" className="rounded-xl border-gray-300" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Edad</label>
                    <Input disabled value={traveler.age} className="rounded-xl border-gray-300" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Sexo</label>
                    <Select>
                      <SelectTrigger className="rounded-xl border-gray-300">
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
                  <label className="block text-sm mb-1">Nacionalidad</label>
                  <Select>
                    <SelectTrigger className="rounded-xl border-gray-300">
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
                  <label className="block text-sm mb-1">País de residencia</label>
                  <Select>
                    <SelectTrigger className="rounded-xl border-gray-300">
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
                  <label className="block text-sm mb-1">Teléfono</label>
                  <div className="flex">
                    <Select defaultValue="co">
                      <SelectTrigger className="w-[100px] rounded-xl border-gray-300">
                        <SelectValue placeholder="🇨🇴 +57" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="co">🇨🇴 +57</SelectItem>
                        <SelectItem value="pe">🇵🇪 +51</SelectItem>
                        <SelectItem value="ec">🇪🇨 +593</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input className="flex-1 ml-2 rounded-xl border-gray-300" placeholder="Número de teléfono" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1">Correo electrónico</label>
                  <Input type="email" placeholder="correo@ejemplo.com" className="rounded-xl border-gray-300" />
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="space-y-4">
          <div className="bg-red-600 text-white px-4 py-2 text-sm">
            <h2 className="font-medium">Contacto de emergencia</h2>
          </div>
          <div className="space-y-4 p-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Nombre(s)</label>
                <Input placeholder="Ingrese su nombre" className="rounded-xl border-gray-300" />
              </div>
              <div>
                <label className="block text-sm mb-1">Apellidos</label>
                <Input placeholder="Ingrese su apellido" className="rounded-xl border-gray-300" />
              </div>
              <div>
                <label className="block text-sm mb-1">Teléfono</label>
                <div className="flex">
                  <Select defaultValue="co">
                    <SelectTrigger className="w-[100px] rounded-xl border-gray-300">
                      <SelectValue placeholder="🇨🇴 +57" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="co">🇨🇴 +57</SelectItem>
                      <SelectItem value="pe">🇵🇪 +51</SelectItem>
                      <SelectItem value="ec">🇪🇨 +593</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input className="flex-1 ml-2 rounded-xl border-gray-300" placeholder="Número de teléfono" />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Teléfono 2 (Opcional)</label>
                <div className="flex">
                  <Select defaultValue="co">
                    <SelectTrigger className="w-[100px] rounded-xl border-gray-300">
                      <SelectValue placeholder="🇨🇴 +57" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="co">🇨🇴 +57</SelectItem>
                      <SelectItem value="pe">🇵🇪 +51</SelectItem>
                      <SelectItem value="ec">🇪🇨 +593</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input className="flex-1 ml-2 rounded-xl border-gray-300" placeholder="Número de teléfono" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-0">
            <div className="bg-red-600 text-white p-4">
              <h2 className="font-medium">Detalles de tu compra</h2>
              <p className="text-sm mt-1">INCLUYE: 6 días 2 personas</p>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between pb-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Número de viajeros:</span>
                  <span className="font-semibold">2</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Valor del producto en pesos:</span>
                  <span className="font-semibold">$7,426,241,52 COP</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Valor del producto en dólares:</span>
                  <span className="font-semibold">$136 USD</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Valor por viajero en pesos:</span>
                  <span className="font-semibold">$73,929.76 COP</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Valor por viajero en dólares:</span>
                  <span className="font-semibold">$162 USD</span>
                </div>
              </div>
              <div className="space-y-3 text-red-600">
                <div className="flex justify-between">
                  <span className="font-medium">Recargos Upgrades</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span>Total en dólares:</span>
                  <span className="font-semibold">$524 USD</span>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between text-lg">
                  <span className="font-medium">TOTAL:</span>
                  <span className="font-semibold">$1'426.241,52 COP</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <Button
                className="w-full rounded-full border-2 border-black bg-white text-black hover:bg-gray-50"
                size="lg"
              >
                Continuar <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <div className="flex justify-center gap-4">
            <img
              src="/placeholder.svg"
              alt="Encriptación SSL protegida"
              className="w-6 h-6"
            />
            <img
              src="/placeholder.svg"
              alt="Pago seguro garantizado"
              className="w-6 h-6"
            />
          </div>
          <div className="flex justify-center gap-2">
            <img src="/placeholder.svg" alt="PayPal" className="w-[60px] h-[30px]" />
            <img src="/placeholder.svg" alt="Visa" className="w-[60px] h-[30px]" />
            <img src="/placeholder.svg" alt="Mastercard" className="w-[60px] h-[30px]" />
            <img src="/placeholder.svg" alt="American Express" className="w-[60px] h-[30px]" />
          </div>
        </div>
      </div>
    </form>
    </>
  )
}