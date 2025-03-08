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
import { useMessageTranslations } from '@/TravelCore/Utils/validations/useMessageTranslations.ts'
import { validateForm } from '@/TravelCore/Utils/validations/formValidations.ts'

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
  const [travelersData, setTravelersData] = useState<PaxForm[]>([])
  const [emergencyContact, setEmergencyContact] = useState<EmergencyContactType>({
    firstName: '',
    lastName: '',
    phone1: '',
    phone2: '',
    indicative1: '',
    indicative2: ''
  })

  useEffect(() => {
    if (data) {
      setTravelersData(data.travelersData || [])
      setEmergencyContact(
        data.emergencyContactData || { firstName: '', lastName: '', phone1: '', phone2: '', indicative1: '', indicative2: '' }
      )
      console.log('rescatando el estado', travelersData, data.travelersData)
    }
  }, [data])

  const travelers = createTravelers(data?.payloadOrder?.cantidadPax ?? 0, data?.payloadOrder?.edades ?? '')

  const handleSendTravelers = async () => {
    setData?.((prevData: any) => ({
      ...prevData,
      travelersData: travelersData.filter(item => item !== undefined),
      emergencyContactData: emergencyContact
    }))

    const masters = new Masters()
    const resp = await masters.getCitiesByCountry({ countryId: travelersData.filter(item => item !== undefined)[0].residenceCountry })
    console.log('resp cities', resp)

    if (resp?.data) {
      if (masterContext) {
        masterContext['cities'].setData(resp.data)
      }
      navigate('/invoice')
      // setTimeout(() => {
      //   console.log('redirigiendo a /invoice')
      // }, 1000)
    }
  }

  const handleChangeTravelers = useCallback((index: number, name: string, value: string) => {
    console.log('index', index)
    setTravelersData(prevData => {
      const updatedTravelers = [...prevData]
      updatedTravelers[index] = {
        ...updatedTravelers[index],
        [name]: value
      }
      return updatedTravelers
    })
  }, [])

  const handleChangeEmergency = (name: string, value: any) => {
    setEmergencyContact(prevData => ({
      ...prevData,
      [name]: value
    }))
  }
  // console.log('emergency state: ', emergencyContact)

  //Validations
  const msg = useMessageTranslations()
  const [formData, setFormData] = useState({ travelers: '' })
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({})

  const validationRules = {
    // Traveler form validation rules
    firstName: { required: true },
    lastName: { required: true },
    documentType: { required: true },
    documentNumber: { required: true },
    birthdate: { required: true },
    gender: { required: true },
    nationality: { required: true },
    residenceCountry: { required: true },
    phone: { required: true },
    countryCode: { required: true },
    email: { required: true, email: true },

    // Emergency contact validation rules
    firstNameEmergencyContact: { required: true },
    lastNameEmergencyContact: { required: true },
    phone1EmergencyContact: { required: true },
    indicative1EmergencyContact: { required: true },
    phone2EmergencyContact: { required: false },
    indicative2EmergencyContact: { required: false }
  }

  const handleChangeValidator = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    const validationResult = validateForm({ [field]: value }, msg, { [field]: validationRules[field as keyof typeof validationRules] })
    setErrors(prev => ({
      ...prev,
      [field]: validationResult.errors[field] || []
    }))
  }

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const validationResult = validateForm(formData, msg, validationRules)

    if (!validationResult.isValid) {
      setErrors(validationResult.errors)
      return
    }
    handleSendTravelers()
  }

  return (
    <>
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
                  onChange={handleChangeValidator}
                  errors={errors}
                />
              ))}
              <EmergencyContact data={emergencyContact} onChangeField={handleChangeEmergency} />
            </form>
          </section>
          <PurchaseDetails button={<ContinuarButton onClick={handleSubmit} />} />
        </section>
      </main>
    </>
  )
}
