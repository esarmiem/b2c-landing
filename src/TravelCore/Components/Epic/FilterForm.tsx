import { ArrowRight, Calendar, Earth, Pencil, PlaneTakeoff, Users } from 'lucide-react'
import { type Dispatch, type MouseEvent, type SetStateAction, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { OriginPopover } from '@/TravelCore/Components/Epic/OriginPopover'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import useMasters from '@/TravelCore/Hooks/useMasters'
import type { ArrivalsItems } from '@/TravelCore/Utils/interfaces/Arrivals'
import type { CountriesItems } from '@/TravelCore/Utils/interfaces/countries'
import useData from '@/TravelCore/Hooks/useData'
import { Calendar as Datepicker } from '@/components/ui/calendar'
import { NumberTravelers } from '@/TravelCore/Components/Raw/NumberTravelers'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { DestinationPopover } from '@/TravelCore/Components/Epic/DestinationPopover.tsx'
import { format, parse, isBefore, startOfDay } from 'date-fns'
import type { dataOrder } from '@/TravelCore/Utils/interfaces/Order'
import useHomeState from '@/TravelFeatures/Home/stateHelper'
import { validateForm } from '@/TravelCore/Utils/validations/formValidations.ts'
import { useMessageTranslations } from '@/TravelCore/Utils/validations/useMessageTranslations.ts'

interface FilterFormProps {
  handleChange: (field: string, value: string) => void
  setErrors: Dispatch<SetStateAction<{ [p: string]: string[] }>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
  formData: { travelers: string }
  errors: { [p: string]: string[] }
  validationRules: { travelers: { requiredAge: boolean } }
}

export const FilterForm = ({ handleChange, formData, errors, setErrors, setIsLoading, validationRules }: FilterFormProps) => {
  const msg = useMessageTranslations()
  const { HandleGetOrder } = useHomeState()
  const errorTraveler = errors?.travelers

  const master = useMasters()
  const arrivals = master?.arrivals.data?.items as ArrivalsItems[]
  const countries = master?.countries?.data?.items as CountriesItems[]

  const { data, setData } = useData() || {}
  const payloadOrder = data?.payloadOrder
  const origin = countries?.find(country => country.codigoISO === (payloadOrder?.pais ? payloadOrder?.pais : 'CO'))?.descripcion

  const { t, i18n } = useTranslation(['products'])
  const [isEditing, setIsEditing] = useState(false)

  const [originOpen, setOriginPopoverOpen] = useState(false)
  const [destinationOpen, setDestinationOpen] = useState(false)
  const [trevelersOpen, setTravelersOpen] = useState(false)
  const [departureOpen, setDepartureOpen] = useState(false)
  const [returnOpen, setReturnOpen] = useState(false)

  // Refs for detecting outside clicks
  const departureDateRef = useRef<HTMLDivElement>(null)
  const returnDateRef = useRef<HTMLDivElement>(null)

  // Función para deshabilitar fechas pasadas
  const disablePastDates = (date: Date) => {
    return isBefore(date, startOfDay(new Date()))
  }

  // Properly parse dates from DD/MM/YYYY format
  const [departureDate, setDepartureDate] = useState<Date>(() => {
    if (!payloadOrder?.salida) return new Date()

    const parsedDate = parse(payloadOrder?.salida ?? '', 'dd/MM/yyyy', new Date())

    // Si la fecha parseada es pasada, usar la fecha actual
    if (isBefore(parsedDate, startOfDay(new Date()))) {
      return new Date()
    }

    return parsedDate
  })

  const [returnDate, setReturnDate] = useState<Date>(() => {
    if (!payloadOrder?.llegada) return new Date()

    const parsedDate = parse(payloadOrder?.llegada ?? '', 'dd/MM/yyyy', new Date())

    // Si la fecha parseada es pasada, usar departureDate + 1 día
    if (isBefore(parsedDate, startOfDay(new Date()))) {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      return tomorrow
    }

    return parsedDate
  })

  // Handle outside clicks to close calendars
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (departureDateRef.current && !departureDateRef.current.contains(event.target as Node) && departureOpen) {
        setDepartureOpen(false)
      }
      if (returnDateRef.current && !returnDateRef.current.contains(event.target as Node) && returnOpen) {
        setReturnOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside as unknown as EventListener)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as unknown as EventListener)
    }
  }, [departureOpen, returnOpen])

  // Close calendars when other popovers open
  useEffect(() => {
    if (originOpen || destinationOpen || trevelersOpen) {
      setDepartureOpen(false)
      setReturnOpen(false)
    }
  }, [originOpen, destinationOpen, trevelersOpen])

  const formatDate = (date: Date | undefined): string => {
    if (!date) return t('label-default-from-date')
    const locale = i18n.language === 'es' ? 'es' : 'en'
    return dayjs(date).locale(locale).format('D [de] MMMM YYYY')
  }

  // Save departure date to data context
  const handleDepartureDateChange = (date: Date | undefined) => {
    if (date && setData) {
      handleChange('travelDate', format(date, 'dd/MM/yyyy'))
      setDepartureDate(date)
      setData(prevData => ({
        ...prevData,
        payloadOrder: {
          ...prevData?.payloadOrder,
          salida: format(date, 'dd/MM/yyyy')
        }
      }))

      // Si la fecha de retorno es anterior a la fecha de salida, actualizarla también
      if (returnDate && isBefore(returnDate, date)) {
        // Establecer la fecha de retorno un día después de la fecha de salida
        const newReturnDate = new Date(date)
        newReturnDate.setDate(newReturnDate.getDate() + 1)

        handleReturnDateChange(newReturnDate)
      }
    }
  }

  // Save return date to data context
  const handleReturnDateChange = (date: Date | undefined) => {
    if (date && setData) {
      setReturnDate(date)
      setData(prevData => ({
        ...prevData,
        payloadOrder: {
          ...prevData?.payloadOrder,
          llegada: format(date, 'dd/MM/yyyy')
        }
      }))
    }
  }

  // Save initial payload to detect changes
  const initialPayloadRef = useRef<dataOrder | null>(null)
  const hasChanges = (current: dataOrder | undefined, initial: dataOrder | null): boolean => {
    if (!current || !initial) return false

    return (
      current.pais !== initial.pais ||
      current.destino !== initial.destino ||
      current.salida !== initial.salida ||
      current.llegada !== initial.llegada ||
      current.cantidadPax !== initial.cantidadPax
    )
  }

  const handleSave = async () => {
    setIsEditing(true)

    const validationResult = validateForm(formData, msg, validationRules)

    if (!validationResult.isValid) {
      setErrors(validationResult.errors)
      return
    }

    if (isEditing) {
      if (hasChanges(payloadOrder as dataOrder, initialPayloadRef.current)) {
        setIsLoading(true)
        await HandleGetOrder(payloadOrder as dataOrder)
        setIsLoading(false)
      } else {
        console.log('No se detectaron cambios, omitiendo actualización')
      }
    } else {
      initialPayloadRef.current = { ...(payloadOrder as dataOrder) }
    }
    setIsEditing(!isEditing)
  }

  return (
    <div className="max-w-6xl mx-auto p-4 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div
        className={`bg-white rounded-lg flex flex-col md:flex-row items-end justify-between py-2 px-2 gap-4 flex-wrap transition-all border-2 ${
          isEditing ? 'border-red-500' : 'border-white'
        }`}
      >
        <div className="flex items-end gap-2 w-full sm:w-1/2 md:w-auto">
          {/* Origen */}
          <div className="text-red-700">
            <Earth className="w-10 h-10" />
          </div>
          <div className="leading-4 space-y-0.5">
            <div className="text-base font-bold text-red-700">{t('label-origin')}</div>
            <Popover open={originOpen} onOpenChange={setOriginPopoverOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  disabled={!isEditing}
                  className={`actionable text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer' : 'disabled'}`}
                >
                  {origin ? origin : t('label-default-origin')}
                </button>
              </PopoverTrigger>
              <OriginPopover setOriginPopoverOpen={setOriginPopoverOpen} />
            </Popover>
          </div>

          {/*Destino*/}
          <div className="text-red-700">
            <PlaneTakeoff className="w-10 h-10" />
          </div>
          <div className="leading-4 space-y-0.5">
            <div className="text-base font-bold text-red-700">{t('label-destination')}</div>
            <Popover open={destinationOpen} onOpenChange={setDestinationOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  disabled={!isEditing}
                  className={`actionable text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer' : ''}`}
                >
                  {payloadOrder?.destino
                    ? arrivals?.find(dest => dest.idDestino === payloadOrder.destino)?.descripcion
                    : t('label-default-destination')}
                </button>
              </PopoverTrigger>
              <DestinationPopover setDestinationPopoverOpen={setDestinationOpen} />
            </Popover>
          </div>
        </div>

        {/* Desde */}
        <div className="flex items-end gap-2 w-full sm:w-1/2 md:w-auto">
          <div className="text-red-700">
            <Calendar className="w-10 h-10" />
          </div>
          <div className="leading-4" ref={departureDateRef}>
            <div className="text-base font-bold text-red-700">{t('label-from')}</div>
            <div>
              <button
                disabled={!isEditing}
                type="button"
                onClick={() => {
                  setReturnOpen(false) // Close return calendar if open
                  setDepartureOpen(prev => !prev)
                }}
                className={`actionable flex text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer' : ''}`}
              >
                {formatDate(departureDate)}
              </button>
              {departureOpen && (
                <div className="absolute z-50 bg-white rounded-md shadow-lg mt-1">
                  <Datepicker
                    mode="single"
                    selected={departureDate}
                    defaultMonth={departureDate}
                    disabled={disablePastDates}
                    onSelect={date => {
                      if (date) {
                        handleDepartureDateChange(date)
                        setDepartureOpen(false)
                      }
                    }}
                    initialFocus
                  />
                </div>
              )}
            </div>
          </div>

          <div className="text-black">
            <ArrowRight className="w-5 h-5" />
          </div>

          {/*Hasta*/}
          <div className="leading-4 space-y-0.5" ref={returnDateRef}>
            <div className="text-base font-bold text-red-700">{t('label-to')}</div>
            <button
              disabled={!isEditing}
              type="button"
              onClick={() => {
                setDepartureOpen(false) // Close departure calendar if open
                setReturnOpen(prev => !prev)
              }}
              className={`actionable text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer' : ''}`}
            >
              {formatDate(returnDate)}
            </button>
            {returnOpen && (
              <div className="absolute z-50 bg-white rounded-md shadow-lg mt-1">
                <Datepicker
                  mode="single"
                  selected={returnDate}
                  defaultMonth={returnDate}
                  disabled={date => {
                    // Deshabilitar fechas pasadas y fechas anteriores a la fecha de salida
                    return isBefore(date, startOfDay(new Date())) || isBefore(date, departureDate)
                  }}
                  onSelect={date => {
                    if (date) {
                      handleReturnDateChange(date)
                      setReturnOpen(false)
                    }
                  }}
                  initialFocus
                />
              </div>
            )}
          </div>
        </div>

        {/*Viajeros*/}
        <div className="flex items-end gap-2 w-full sm:w-1/2 md:w-auto">
          <div className="text-red-700">
            <Users className="w-10 h-10" />
          </div>
          <Popover open={trevelersOpen} onOpenChange={setTravelersOpen}>
            <PopoverTrigger asChild>
              <div className="leading-4">
                <div className="text-base font-bold text-red-700">{t('label-passengers')}</div>
                <button
                  disabled={!isEditing}
                  type="button"
                  onClick={() => setTravelersOpen(prev => !prev)}
                  className={`actionable text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer' : ''} ${errorTraveler && errorTraveler?.length > 0 ? 'text-red-500' : ''}`}
                >
                  {errorTraveler && errorTraveler?.length > 0
                    ? errorTraveler
                    : `${payloadOrder?.cantidadPax || 1} ${t('label-default-passengers')}`}
                </button>
              </div>
            </PopoverTrigger>
            <NumberTravelers onChange={value => handleChange('travelers', value)} setIsOpen={setTravelersOpen} />
          </Popover>
        </div>

        {/* Botón Modificar */}
        <button
          type="button"
          onClick={handleSave}
          className={`px-4 py-2 ${isEditing ? 'text-white bg-red-800' : 'text-red-700 bg-white hover:bg-red-50'} rounded-md transition-colors border border-red-200
          hover:cursor-pointer active:text-red-900 active:border-red-900 flex items-center gap-2 w-full sm:w-auto`}
        >
          <Pencil className="w-4 h-4" />
          {t(isEditing ? 'button-save' : 'button-edit')}
        </button>
      </div>
    </div>
  )
}
