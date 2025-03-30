import { useState, useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import useData from '@/TravelCore/Hooks/useData'
import useMasters from '@/TravelCore/Hooks/useMasters'
import { useUtilsValidations } from '@/TravelCore/Utils/validations/useUtilsValidations'
import type { EmergencyContactType, PaxForm } from '@/TravelCore/Utils/interfaces/Order'
import { createTravelers } from '@/TravelCore/Utils/object'
import { Masters } from '@/TravelFeatures/Traveler/model/masters_entity'

export const useTravelForm = () => {
  const { t } = useTranslation(['traveler'])
  const masterContext = useMasters()
  const { data, setData } = useData() || {}
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const travelers = useMemo(() => {
    return createTravelers(data?.payloadOrder?.cantidadPax ?? 0, data?.payloadOrder?.edades ?? '')
  }, [data?.payloadOrder?.cantidadPax, data?.payloadOrder?.edades])

  // Inicializar travelersData solo una vez con la longitud correcta
  const [travelersData, setTravelersData] = useState<PaxForm[]>(() => {
    return Array(travelers.length).fill({})
  })

  const [emergencyContact, setEmergencyContact] = useState<EmergencyContactType>({
    firstName: '',
    lastName: '',
    phone1: '',
    phone2: '',
    indicative1: '',
    indicative2: ''
  })

  const validationRules = useMemo(() => {
    // Crear reglas para cada viajero
    const travelerRules: Record<string, { required: boolean; email?: boolean }> = {}

    for (let i = 0; i < travelers.length; i++) {
      const index = i + 1
      Object.assign(travelerRules, {
        [`firstName${index}`]: { required: true },
        [`lastName${index}`]: { required: true },
        [`documentType${index}`]: { required: true },
        [`documentNumber${index}`]: { required: true },
        [`birthdate${index}`]: { required: true },
        [`gender${index}`]: { required: true },
        [`nationality${index}`]: { required: true },
        [`residenceCountry${index}`]: { required: true },
        [`phone${index}`]: { required: true },
        [`email${index}`]: { required: true, email: true }
      })
    }

    // Añadir reglas para el contacto de emergencia
    return {
      ...travelerRules,
      firstNameEmergencyContact: { required: true },
      lastNameEmergencyContact: { required: true },
      phone1EmergencyContact: { required: true }
    }
  }, [travelers.length])

  const { errors, handleChangeValidate, validateFormData, setFormData } = useUtilsValidations(validationRules)
  // Cargar datos iniciales si existen
  useEffect(() => {
    if (!data) return

    if (data.travelersData && data.travelersData.length > 0) {
      // Usar una función para el estado inicial para asegurar que solo se ejecute una vez
      setTravelersData(data.travelersData)

      // Actualizar formData con los datos existentes de los viajeros
      const newFormData: Record<string, string> = {}

      for (let index = 0; index < data.travelersData.length; index++) {
        const traveler = data.travelersData[index]
        if (!traveler) continue

        const keys = Object.keys(traveler as unknown as Record<string, unknown>)
        for (const key of keys) {
          const value = (traveler as unknown as Record<string, unknown>)[key]
          if (typeof value === 'string' || typeof value === 'number') {
            newFormData[`${key}${index + 1}`] = String(value)
          }
        }
      }

      setFormData(newFormData)
    }

    // Cargar datos del contacto de emergencia si existen
    if (data.emergencyContactData) {
      setEmergencyContact(data.emergencyContactData)

      // Actualizar formData con los datos del contacto de emergencia
      const emergencyContactFormData: Record<string, string> = {}

      const contactData = data.emergencyContactData as unknown as Record<string, unknown>
      for (const key of Object.keys(contactData)) {
        const value = contactData[key]
        if (typeof value === 'string' || typeof value === 'number') {
          emergencyContactFormData[`${key}EmergencyContact`] = String(value)
        }
      }

      setFormData(prevFormData => ({
        ...prevFormData,
        ...emergencyContactFormData
      }))
    }
  }, [data, setFormData])

  useEffect(() => {
    if (!data?.payloadOrder) return

    // Resetear travelersData
    setTravelersData(Array(travelers.length).fill({}))

    // Resetear emergencyContact
    setEmergencyContact({
      firstName: '',
      lastName: '',
      phone1: '',
      phone2: '',
      indicative1: '',
      indicative2: ''
    })

    // Resetear formData
    setFormData({})
  }, [data?.payloadOrder, travelers.length, setFormData])

  const handleChangeTravelers = useCallback(
    (index: number, name: string, value: string) => {
      const fieldName = name.replace(/\d+$/, '') // Eliminar números del final del nombre

      setTravelersData(prevData => {
        // Si el valor no ha cambiado, no actualizar el estado
        const typedPrevData = prevData[index] as unknown as Record<string, string> | undefined
        if (typedPrevData?.[fieldName] === value) {
          return prevData
        }

        const updatedTravelers = [...prevData]
        if (!updatedTravelers[index]) {
          updatedTravelers[index] = {} as PaxForm
        }

        // Usar inmutabilidad para crear un nuevo objeto solo para este viajero
        updatedTravelers[index] = {
          ...updatedTravelers[index],
          [fieldName]: value
        }

        return updatedTravelers
      })

      handleChangeValidate(name, value)
    },
    [handleChangeValidate]
  )

  // Función optimizada para actualizar el contacto de emergencia
  const handleChangeEmergency = useCallback(
    (name: string, value: string | number) => {
      setEmergencyContact(prevData => {
        // Evitar actualizaciones innecesarias si el valor no ha cambiado
        const typedPrevData = prevData as unknown as Record<string, string | number>
        if (typedPrevData[name] === value) {
          return prevData
        }
        return {
          ...prevData,
          [name]: value
        }
      })
      // Usar validación directa sin debounce
      handleChangeValidate(`${name}EmergencyContact`, String(value))
    },
    [handleChangeValidate]
  )

  // Función para manejar el envío del formulario, con optimizaciones
  const handleSendTravelers = useCallback(async () => {
    // Validar antes de activar el loading
    if (!validateFormData()) {
      return false
    }

    setIsLoading(true)

    try {
      // Filtrar datos de viajeros para eliminar undefined
      const filteredTravelersData = travelersData.filter(Boolean)

      // Actualizar datos en el contexto global
      setData?.(prevData => ({
        ...prevData,
        travelersData: filteredTravelersData,
        emergencyContactData: emergencyContact
      }))

      // Verificar si hay datos de residencia antes de hacer la llamada API
      const residenceCountry = filteredTravelersData[0]?.residenceCountry

      if (residenceCountry) {
        const masters = new Masters()
        const resp = await masters.getCitiesByCountry({ countryId: residenceCountry })

        if (resp?.data && masterContext) {
          masterContext.cities.setData(resp.data)
          navigate('/invoice')
          return true
        }
      } else {
        console.error('No residence country data available')
      }

      return false
    } catch (error) {
      console.error('Error sending travelers data:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [validateFormData, travelersData, emergencyContact, setData, navigate, masterContext])

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!validateFormData()) {
      return
    }
    return handleSendTravelers()
  }

  return {
    travelers,
    travelersData,
    emergencyContact,
    isLoading,
    errors,
    handleChangeTravelers,
    handleChangeEmergency,
    handleChangeValidate,
    handleSubmit,
    t
  }
}
