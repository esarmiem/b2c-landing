import { Breadcrumb } from '@/TravelCore/Components/Epic/Breadcrumb.tsx'
import { EmergencyContact } from '@/TravelCore/Components/Epic/EmergencyContact.tsx'
import { HeaderTraveler } from '@/TravelCore/Components/Epic/HeaderTraveler.tsx'
import { PurchaseDetails } from '@/TravelCore/Components/Epic/PurchaseDetails.tsx'
import { TravelerForm } from '@/TravelCore/Components/Epic/TravelerForm.tsx'
import { ContinuarButton } from '@/TravelCore/Components/Raw/ContinuarButton.tsx'
import { GoBack } from '@/TravelCore/Components/Raw/GoBack.tsx'
import useData from '@/TravelCore/Hooks/useData.ts'
import useMasters from '@/TravelCore/Hooks/useMasters.ts'
import type { EmergencyContactType, PaxForm } from '@/TravelCore/Utils/interfaces/Order.ts'
import { createTravelers } from '@/TravelCore/Utils/object.ts'
import { Masters } from '@/TravelFeatures/Traveler/model/masters_entity.ts'
import { type MouseEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useUtilsValidations } from '@/TravelCore/Utils/validations/useUtilsValidations.ts'
import Loader from '@/TravelCore/Components/Raw/Loader.tsx'

/**
 * TravelForm
 *
 * Spanish:
 * Componente que renderiza el formulario de viaje. Este componente integra varios subcomponentes:
 * - Breadcrumb: muestra la ruta de navegación.
 * - HeaderTraveler: visualiza la información de los viajeros.
 * - TravelerForm: formulario individual para cada viajero.
 * - EmergencyContact: formulario para el contacto de emergencia.
 * - PurchaseDetails: muestra los detalles de la compra, incluyendo un botón para continuar.
 *
 * English:
 * Component that renders the travel form. This component integrates several subcomponents:
 * - Breadcrumb: displays the navigation path.
 * - HeaderTraveler: shows traveler information.
 * - TravelerForm: individual form for each traveler.
 * - EmergencyContact: form for emergency contact information.
 * - PurchaseDetails: displays purchase details, including a continue button.
 */
export default function TravelForm() {
  // Hook de traducción para obtener textos en distintos idiomas.
  // Translation hook to retrieve texts in different languages.
  const { t } = useTranslation(['traveler'])
  // Array de viajeros con información traducida.
  // Array of travelers with translated information.
  const masterContext = useMasters()
  const { data, setData } = useData() || {}
  const navigate = useNavigate()

  const travelers = createTravelers(data?.payloadOrder?.cantidadPax ?? 0, data?.payloadOrder?.edades ?? '')
  const [travelersData, setTravelersData] = useState<PaxForm[]>(Array(travelers.length).fill({}))
  const [emergencyContact, setEmergencyContact] = useState<EmergencyContactType>({
    firstName: '',
    lastName: '',
    phone1: '',
    phone2: '',
    indicative1: '',
    indicative2: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSendTravelers = async () => {
    setIsLoading(true)
    try {
      setData?.((prevData: any) => ({
        ...prevData,
        travelersData: travelersData.filter(item => item !== undefined),
        emergencyContactData: emergencyContact
      }))

      const masters = new Masters()
      const resp = await masters.getCitiesByCountry({ countryId: travelersData.filter(item => item !== undefined)[0].residenceCountry })
      if (resp?.data) {
        if (masterContext) {
          masterContext.cities.setData(resp.data)
        }
        navigate('/invoice')
      }
    } catch (error) {
      console.error('Error sending travelers data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  //Validations
  const validationRules = Object.assign(
    {},
    ...Array.from({ length: travelers.length }, (_, i) => ({
      [`firstName${i + 1}`]: { required: true },
      [`lastName${i + 1}`]: { required: true },
      [`documentType${i + 1}`]: { required: true },
      [`documentNumber${i + 1}`]: { required: true },
      [`birthdate${i + 1}`]: { required: true },
      [`gender${i + 1}`]: { required: true },
      [`nationality${i + 1}`]: { required: true },
      [`residenceCountry${i + 1}`]: { required: true },
      [`phone${i + 1}`]: { required: true },
      [`email${i + 1}`]: { required: true, email: true }
    })),
    {
      firstNameEmergencyContact: { required: true },
      lastNameEmergencyContact: { required: true },
      phone1EmergencyContact: { required: true }
    }
  )

  const { errors, handleChangeValidate, validateFormData, setFormData } = useUtilsValidations(validationRules)

  useEffect(() => {
    if (data) {
      if (data.travelersData && data.travelersData.length > 0) {
        setTravelersData(data.travelersData)

        // Actualizar también el formData con los datos existentes
        const newFormData: { [key: string]: string } = {}
        for (const [index, traveler] of data.travelersData.entries()) {
          for (const [key, value] of Object.entries(traveler)) {
            if (typeof value === 'string' || typeof value === 'number') {
              newFormData[`${key}${index + 1}`] = String(value)
            }
          }
        }
        setFormData(newFormData)
      }

      if (data.emergencyContactData) {
        setEmergencyContact(data.emergencyContactData)

        // Actualizar también el formData con los datos de emergencyContact
        const emergencyContactFormData: { [key: string]: string } = {}
        for (const [key, value] of Object.entries(data.emergencyContactData)) {
          if (typeof value === 'string' || typeof value === 'number') {
            emergencyContactFormData[`${key}EmergencyContact`] = String(value)
          }
        }
        setFormData(prevFormData => ({
          ...prevFormData,
          ...emergencyContactFormData
        }))
      }
    }
  }, [data, setFormData])

  const handleChangeTravelers = useCallback(
    (index: number, name: string, value: string) => {
      // Actualizar el estado local de travelersData
      setTravelersData(prevData => {
        const updatedTravelers = [...prevData]
        if (!updatedTravelers[index]) {
          updatedTravelers[index] = {}
        }
        updatedTravelers[index] = {
          ...updatedTravelers[index],
          [name.replace(/\d+$/, '')]: value // Eliminar cualquier número del final del nombre
        }
        return updatedTravelers
      })

      handleChangeValidate(name, value)
    },
    [handleChangeValidate]
  )

  const handleChangeEmergency = (name: string, value: any) => {
    setEmergencyContact(prevData => ({
      ...prevData,
      [name]: value
    }))

    handleChangeValidate(`${name}EmergencyContact`, value)
  }

  const handleChange = (field: string, value: string) => {
    handleChangeValidate(field, value)
  }

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (!validateFormData()) {
      return
    }
    handleSendTravelers()
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-100">
          <Loader />
        </div>
      )}
      <Breadcrumb />
      <main className="max-w-6xl mx-auto p-4 my-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <GoBack title={t('label-back-to-coverages')} url="quote/travel" />
        <section className="grid md:grid-cols-[1fr_400px] gap-6 my-2">
          <section className="space-y-4 items-center">
            <HeaderTraveler traveler={travelers} />
            <form className="border border-gray-200 rounded-2xl space-y-4">
              {travelers.map(traveler => (
                <TravelerForm
                  key={traveler?.id}
                  traveler={traveler}
                  onChangeField={handleChangeTravelers}
                  dataTraveler={travelersData[traveler?.id]}
                  onChange={handleChange}
                  errors={errors}
                />
              ))}
              <EmergencyContact data={emergencyContact} onChangeField={handleChangeEmergency} errors={errors} onChange={handleChange} />
            </form>
          </section>
          <PurchaseDetails button={<ContinuarButton onClick={handleSubmit} />} />
        </section>
      </main>
    </div>
  )
}
