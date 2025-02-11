import {Breadcrumb} from '@/TravelCore/Components/Epic/Breadcrumb'

import { useState } from "react"
import { CornerUpLeft, ChevronRight, Users, SquareUser, ShoppingCart } from "lucide-react"
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
      {/*Container*/}
        <form className="max-w-6xl mx-auto p-4 grid md:grid-cols-[1fr_400px] gap-6 mb-6">
          <section className="space-y-4">

            {/*boton hacia atras*/}
            <button className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-100">
              <CornerUpLeft className="w-4 h-4" />
              <a href="#" className="text-sm text-grey-600">
                Volver a las coberturas
              </a>
            </button>

            {/*Encabezado del formulario*/}
            <section className={"flex items-center gap-1 justify-start"}>
              <Users className="w-6 h-6 text-gray-800 mx-4"/>
              <div className={"flex flex-col w-full"}>
                <h1 className="text-4xl mb-2 font-stretch-75">Datos de los viajeros</h1>
                <p className="text-sm text-gray-800">
                  Al ingresar tus datos, aceptas nuestra Política de{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Manejo de Datos y Términos de Uso
                  </a>
                </p>
              </div>
            </section>

            {/*Formulario de datos de viajeros*/}
            <form className="border border-gray-200 rounded-xl space-y-4">
              {travelers.map((traveler) => (
                <section key={traveler.id} className="space-y-4">
                  <div className="bg-[#B91C1C] text-white px-8 py-2 text-sm flex items-center gap-2 rounded-t-xl">
                    <SquareUser className="w-6 h-6" />
                    <h1 className="font-medium text-xl">
                      Viajero {traveler.id} - {traveler.age}
                    </h1>
                  </div>

                  <div className="space-y-4 p-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-1">Nombre(s)</label>
                        <Input placeholder="Ingrese su nombre" className="rounded-2xl border-gray-300 p-5" />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Apellidos</label>
                        <Input placeholder="Ingrese su apellido" className="rounded-2xl border-gray-300 p-5" />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Tipo de documento</label>
                        <Select>
                          <SelectTrigger className="rounded-2xl border-gray-300 p-5">
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
                        <Input placeholder="Número de documento" className="rounded-2xl border-gray-300 p-5" />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Fecha de nacimiento</label>
                        <Input type="date" className="rounded-2xl border-gray-300 p-5" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-1">Edad</label>
                          <Input disabled value={traveler.age} className="rounded-2xl border-gray-300 p-5" />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">Sexo</label>
                          <Select>
                            <SelectTrigger className="rounded-2xl border-gray-300 p-5">
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
                          <SelectTrigger className="rounded-2xl border-gray-300 p-5">
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
                          <SelectTrigger className="rounded-2xl border-gray-300 p-5">
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
                        <div className="flex border border-gray-300 rounded-2xl">
                          <Select defaultValue="co" >
                            <SelectTrigger className="w-[80px] p-5 border-none focus:outline-none focus:ring-0">
                              <SelectValue placeholder="🇨🇴" />
                            </SelectTrigger>
                            <SelectContent className="w-[80px] max-w-[80px] !important">
                              <SelectItem className="w-[80px]" value="co">🇨🇴</SelectItem>
                              <SelectItem className="w-[80px]" value="pe">🇵🇪</SelectItem>
                              <SelectItem className="w-[80px]" value="ec">🇪🇨</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input className="flex-1 ml-2 p-5 border-none focus:outline-none focus:ring-0 focus:" placeholder="Número de teléfono" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Correo electrónico</label>
                        <Input type="email" placeholder="correo@ejemplo.com" className="rounded-2xl border-gray-300 p-5" />
                      </div>
                    </div>
                  </div>
                </section>
              ))}

              {/*Contacto de emergencia*/}
              <section className="space-y-4 pb-4">
                <div className="px-4 py-1">
                  <h2 className="text-2xl font-extrabold text-[#B91C1C]">Contacto de emergencia</h2>
                </div>

                <div className="space-y-4 px-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1">Nombre(s)</label>
                      <Input placeholder="Ingrese su nombre" className="rounded-2xl border-gray-300 p-5" />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Apellidos</label>
                      <Input placeholder="Ingrese su apellido" className="rounded-2xl border-gray-300 p-5" />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Teléfono</label>
                      <div className="flex border border-gray-300 rounded-2xl">
                        <Select defaultValue="co" >
                          <SelectTrigger className="w-[80px] p-5 border-none focus:outline-none focus:ring-0">
                            <SelectValue placeholder="🇨🇴" />
                          </SelectTrigger>
                          <SelectContent className="w-[80px] max-w-[80px] !important">
                            <SelectItem className="w-[80px]" value="co">🇨🇴</SelectItem>
                            <SelectItem className="w-[80px]" value="pe">🇵🇪</SelectItem>
                            <SelectItem className="w-[80px]" value="ec">🇪🇨</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input className="flex-1 ml-2 p-5 border-none focus:outline-none focus:ring-0 focus:" placeholder="Número de teléfono" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Teléfono 2 (Opcional)</label>
                      <div className="flex border border-gray-300 rounded-2xl">
                        <Select defaultValue="co" >
                          <SelectTrigger className="w-[80px] p-5 border-none focus:outline-none focus:ring-0">
                            <SelectValue placeholder="🇨🇴" />
                          </SelectTrigger>
                          <SelectContent className="w-[80px] max-w-[80px] !important">
                            <SelectItem className="w-[80px]" value="co">🇨🇴</SelectItem>
                            <SelectItem className="w-[80px]" value="pe">🇵🇪</SelectItem>
                            <SelectItem className="w-[80px]" value="ec">🇪🇨</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input className="flex-1 ml-2 p-5 border-none focus:outline-none focus:ring-0 focus:" placeholder="Número de teléfono" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </form>
          </section>

          <section className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="bg-red-900 text-white p-4 flex items-center gap-1 rounded-t-xl">
                  <div className="w-12 h-12 m-3 rounded-full bg-red-800 flex items-center justify-center">
                    <ShoppingCart className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col p-0">
                    <h1 className="font-medium text-xl">Detalles de tu compra</h1>
                    <p className="text-sm mt-1">Europa, 6 días 2 personas</p>
                  </div>
                </div>

                <div className="p-4 space-y-4 mb-4">
                  <div className="space-y-2 md:mb-16 sm:mb-8">
                    <div className="flex justify-between border-b border-gray-200">
                      <span className="text-sm text-gray-600">Número de viajeros:</span>
                      <span className="text-sm font-semibold">2</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200">
                      <span className="text-sm text-gray-600">Valor del producto en pesos:</span>
                      <span className="text-sm font-semibold">$7,426,241,52 COP</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200">
                      <span className="text-sm text-gray-600">Valor del producto en dólares:</span>
                      <span className="text-sm font-semibold">$136 USD</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200">
                      <span className="text-sm text-gray-600">Valor por viajero en pesos:</span>
                      <span className="text-sm font-semibold">$73,929.76 COP</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200">
                      <span className="text-sm text-gray-600">Valor por viajero en dólares:</span>
                      <span className="text-sm font-semibold">$162 USD</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h1 className="font-bold">Resumen Upgrades</h1>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Upgrades</span>
                      <span className="text-sm text-gray-600">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total en dólares:</span>
                      <span className="text-sm text-gray-600">$524 USD</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">TOTAL:</span>
                      <span className="font-semibold">$1'426.241,52 COP</span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <Button
                    className="w-full p-6 rounded-full border-2 border-black bg-white text-black hover:bg-gray-100"
                  >
                   <span className="flex text-lg font-semibold items-center">Continuar <ChevronRight className="w-4 h-4 ml-2" /></span>
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
          </section>
        </form>
    </>
  )
}