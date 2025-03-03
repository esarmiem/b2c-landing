import { ArrowRight, Calendar, Check, Earth, MapPinHouse, Pencil, PlaneTakeoff, Users } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { OriginPopover } from '@/TravelCore/Components/Epic/OriginPopover'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import useMasters from '@/TravelCore/Hooks/useMasters'
import type { ArrivalsItems } from '@/TravelCore/Utils/interfaces/Arrivals'
import type { CountriesItems } from '@/TravelCore/Utils/interfaces/countries'
import useData from '@/TravelCore/Hooks/useData'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { Calendar as Datepicker } from '@/components/ui/calendar'
import { useMessageTranslations } from '@/TravelCore/Utils/validations/useMessageTranslations'
import { NumberTravelers } from '@/TravelCore/Components/Raw/NumberTravelers'
import { validateForm } from '@/TravelCore/Utils/validations/formValidations'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { DestinationPopover } from '@/TravelCore/Components/Epic/DestinationPopover.tsx'

export const FilterForm = () => {
  const master = useMasters()
  // Get the arrivals and countries data from the master hook
  const arrivals = master?.arrivals.data?.items as ArrivalsItems[]
  const countries = master?.countries?.data?.items as CountriesItems[]

  const { data, setData } = useData() || {}
  const payloadOrder = data?.payloadOrder
  const origin = countries?.find(country => country.codigoISO === (payloadOrder?.pais ? payloadOrder?.pais : 'CO'))?.descripcion
  const msg = useMessageTranslations()

  const { t, i18n } = useTranslation(['products'])
  const [isEditing, setIsEditing] = useState(false)
  const [originOpen, setOriginPopoverOpen] = useState(false)
  const [destinationOpen, setDestinationOpen] = useState(false)
  const [trevelersOpen, setTravelersOpen] = useState(false)
  const [departureOpen, setDepartureOpen] = useState(false)
  const [returnOpen, setReturnOpen] = useState(false)

  // Properly parse dates from DD/MM/YYYY format
  const [departureDate, setDepartureDate] = useState<Date>(() => {
    if (!payloadOrder?.salida) return new Date()
    // Parse using dayjs with the correct format
    return dayjs(payloadOrder.salida, 'DD/MM/YYYY').toDate()
  })
  const [returnDate, setReturnDate] = useState<Date>(() => {
    if (!payloadOrder?.llegada) return new Date()
    // Parse using dayjs with the correct format
    return dayjs(payloadOrder.llegada, 'DD/MM/YYYY').toDate()
  })
  // Format date using dayjs
  const formatDate = (date: Date | undefined): string => {
    if (!date) return t('label-default-from-date')
    const locale = i18n.language === 'es' ? 'es' : 'en'
    return dayjs(date).locale(locale).format('D [de] MMMM YYYY')
  }

  const handleChange = (field: string, value: string) => {
    // Implementation as before
  }

  const handleSelectDestination = (dest: ArrivalsItems) => {
    setData?.(prevData => ({
      ...prevData,
      payloadOrder: {
        ...prevData?.payloadOrder,
        destino: dest.idDestino,
        idUser: '5'
      }
    }))
    setOpen(false)
  }

  const toggleEditing = () => {
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
          <div className="leading-4">
            <div className="text-base font-bold text-red-700">{t('label-from')}</div>
            <div>
              <button
                disabled={!isEditing}
                type="button"
                onClick={() => setDepartureOpen(prev => !prev)}
                className={`actionable flex text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer' : ''}`}
              >
                {formatDate(departureDate)}
              </button>
              {departureOpen && (
                <div className="absolute z-50 bg-white rounded-md shadow-lg mt-1">
                  <Datepicker
                    mode="single"
                    selected={departureDate}
                    onSelect={date => {
                      if (date) {
                        setDepartureDate(date)
                        setDepartureOpen(prev => !prev)
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
          <div className="leading-4 space-y-0.5">
            <div className="text-base font-bold text-red-700">{t('label-to')}</div>
            <button
              disabled={!isEditing}
              type="button"
              onClick={() => setReturnOpen(prev => !prev)}
              className={`actionable text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer' : ''}`}
            >
              {formatDate(returnDate)}
            </button>
            {returnOpen && (
              <div className="absolute z-50 bg-white rounded-md shadow-lg mt-1">
                <Datepicker
                  mode="single"
                  selected={returnDate}
                  onSelect={date => {
                    if (date) {
                      setReturnDate(date)
                      setReturnOpen(false)
                    }
                  }}
                  initialFocus
                />
              </div>
            )}
          </div>
        </div>

        {/* Pasajeros */}
        {/*<Popover open={originOpen} onOpenChange={setOriginPopoverOpen}>*/}
        {/*  <PopoverTrigger asChild>*/}
        {/*    <button*/}
        {/*      type="button"*/}
        {/*      disabled={!isEditing}*/}
        {/*      className={`actionable text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer' : 'disabled'}`}*/}
        {/*    >*/}
        {/*      {origin ? origin : t('label-default-origin')}*/}
        {/*    </button>*/}
        {/*  </PopoverTrigger>*/}
        {/*  <OriginPopover setOriginPopoverOpen={setOriginPopoverOpen} />*/}
        {/*</Popover>*/}
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
                  className={`actionable text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer' : ''}`}
                >
                  {`${payloadOrder?.cantidadPax || 1} ${t('label-default-passengers')}`}
                </button>
              </div>
            </PopoverTrigger>
            <NumberTravelers onChange={value => handleChange('travelers', value)} setIsOpen={setTravelersOpen} />
          </Popover>
        </div>

        {/* Botón Modificar */}
        <button
          type="button"
          onClick={toggleEditing}
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
// import { ArrowRight, Calendar, Check, Earth, Pencil, PlaneTakeoff, Users } from 'lucide-react'
// import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { OriginPopover } from '@/TravelCore/Components/Epic/OriginPopover.tsx'
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
// import useMasters from '@/TravelCore/Hooks/useMasters.ts'
// import type { ArrivalsItems } from '@/TravelCore/Utils/interfaces/Arrivals.ts'
// import type { CountriesItems } from '@/TravelCore/Utils/interfaces/countries.ts'
// import useData from '@/TravelCore/Hooks/useData.ts'
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command.tsx'
// import { cn } from '@/lib/utils.ts'
// import { format } from 'date-fns'
// import { Calendar as Datepicker } from '@/components/ui/calendar'
// import { useMessageTranslations } from '@/TravelCore/Utils/validations/useMessageTranslations.ts'
// import { NumberTravelers } from '@/TravelCore/Components/Raw/NumberTravelers.tsx'
// import { validateForm } from '@/TravelCore/Utils/validations/formValidations.ts'
// import i18n from 'i18next'
// import dayjs from 'dayjs'
//
// export const FilterForm = () => {
//   const master = useMasters()
//   const arrivals = master?.arrivals.data?.items as ArrivalsItems[]
//   const countries = master?.countries?.data?.items as CountriesItems[]
//
//   const { data, setData } = useData() || {}
//   const payloadOrder = data?.payloadOrder
//   const origin = countries?.find(country => country.codigoISO === (payloadOrder?.pais ? payloadOrder?.pais : 'CO'))?.descripcion
//   const msg = useMessageTranslations()
//
//   const { t } = useTranslation(['products'])
//   const [isEditing, setIsEditing] = useState(false)
//   const [originOpen, setOriginPopoverOpen] = useState(false)
//   const [open, setOpen] = useState(false)
//   // Departure and return dates
//   const [departureDate, setDepartureDate] = useState(dayjs(payloadOrder?.salida || dayjs()))
//   const [arrivalsDate, setArrivalsDate] = useState(dayjs(payloadOrder?.regreso || dayjs()))
//   const [isOpen, setIsOpen] = useState(false)
//
//   const [formData, setFormData] = useState({
//     destination: '',
//     travelDate: '',
//     travelers: ''
//   })
//   const [errors, setErrors] = useState<{ [key: string]: string[] }>({})
//
//   const validationRules = {
//     destination: { required: true },
//     travelDate: {
//       required: true,
//       isDateRange: true
//     },
//     travelers: { requiredAge: true }
//   }
//
//   const handleChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }))
//
//     const validationResult = validateForm({ [field]: value }, msg, { [field]: validationRules[field as keyof typeof validationRules] })
//     setErrors(prev => ({
//       ...prev,
//       [field]: validationResult.errors[field] || []
//     }))
//   }
//
//   const handleSelectDestination = (dest: ArrivalsItems) => {
//     setData?.(prevData => ({
//       ...prevData,
//       payloadOrder: {
//         ...prevData?.payloadOrder,
//         destino: dest.idDestino,
//         idUser: '5'
//       }
//     }))
//   }
//
//   const toggleEditing = () => {
//     setIsEditing(!isEditing)
//   }
//
//   return (
//     <div className="max-w-6xl mx-auto p-4 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
//       <div
//         className={`bg-white rounded-lg flex flex-col md:flex-row items-end justify-between py-2 px-2 gap-4 flex-wrap transition-all border-2 ${
//           isEditing ? 'border-red-500' : 'border-white'
//         }`}
//       >
//         {/* Origen */}
//         <div className="flex items-end gap-2 w-full sm:w-1/2 md:w-auto">
//           <div className="text-red-700">
//             <Earth className="w-10 h-10" />
//           </div>
//           <div className="leading-4 space-y-0.5">
//             <div className="text-base font-bold text-red-700">{t('label-origin')}</div>
//             <Popover open={originOpen} onOpenChange={setOriginPopoverOpen}>
//               <PopoverTrigger asChild>
//                 <button
//                   type="button"
//                   disabled={!isEditing}
//                   className={`actionable text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer' : 'disabled'}`}
//                 >
//                   {origin ? origin : t('label-default-origin')}
//                 </button>
//               </PopoverTrigger>
//               <OriginPopover setOriginPopoverOpen={setOriginPopoverOpen} />
//             </Popover>
//           </div>
//           <div className="text-red-700">
//             <PlaneTakeoff className="w-10 h-10" />
//           </div>
//           <div className="leading-4 space-y-0.5">
//             <div className="text-base font-bold text-red-700">{t('label-destination')}</div>
//             <Popover open={open} onOpenChange={setOpen}>
//               <PopoverTrigger asChild>
//                 <button
//                   type="button"
//                   disabled={!isEditing}
//                   className={`actionable text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer' : ''}`}
//                 >
//                   {payloadOrder?.destino
//                     ? arrivals?.find(dest => dest.idDestino === payloadOrder.destino)?.descripcion
//                     : t('label-default-destination')}
//                 </button>
//               </PopoverTrigger>
//               <PopoverContent className="w-[200px] p-0">
//                 <Command>
//                   <CommandInput placeholder={t('placeholder-dropdown-destination')} />
//                   <CommandList>
//                     <CommandEmpty>{t('search-dropdown-destination-empty')}</CommandEmpty>
//                     <CommandGroup>
//                       {arrivals?.map(dest => (
//                         <CommandItem
//                           key={dest.idDestino}
//                           onSelect={() => {
//                             handleSelectDestination(dest)
//                             setOpen(false)
//                           }}
//                         >
//                           <Check className={cn('mr-2 h-4 w-4', payloadOrder?.destino === dest.idDestino ? 'opacity-100' : 'opacity-0')} />
//                           {dest.descripcion}
//                         </CommandItem>
//                       ))}
//                     </CommandGroup>
//                   </CommandList>
//                 </Command>
//               </PopoverContent>
//             </Popover>
//           </div>
//         </div>
//
//         {/* Desde */}
//         <div className="flex items-end gap-2 w-full sm:w-1/2 md:w-auto">
//           <div className="text-red-700">
//             <Calendar className="w-10 h-10" />
//           </div>
//           <div className="leading-4">
//             <div className="text-base font-bold text-red-700">{t('label-from')}</div>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <button
//                   disabled={!isEditing}
//                   type="button"
//                   className={`actionable flex text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer' : ''}`}
//                 >
//                   {departureDate ? departureDate.format('D [de] MMMM YYYY') : <span>{t('label-default-from-date')}</span>}
//                 </button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0 items-center m-auto">
//                 <Datepicker
//                   mode="single"
//                   selected={departureDate.toDate}
//                   onSelect={day => day && setDepartureDate(dayjs(day))}
//                   initialFocus
//                 />
//               </PopoverContent>
//             </Popover>
//           </div>
//           <div className="text-black">
//             <ArrowRight className="w-5 h-5" />
//           </div>
//           <div className="leading-4 space-y-0.5">
//             <div className="text-base font-bold text-red-700">{t('label-to')}</div>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <button
//                   disabled={!isEditing}
//                   type="button"
//                   className={`actionable text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer' : ''}`}
//                 >
//                   {t('label-default-to-date')}
//                 </button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0 items-center m-auto">
//                 {/*<Datepicker mode="single" selected={date} onSelect={setDate} initialFocus />*/}
//               </PopoverContent>
//             </Popover>
//           </div>
//         </div>
//
//         {/* Pasajeros */}
//         <div className="flex items-end gap-2 w-full sm:w-1/2 md:w-auto">
//           <div className="text-red-700">
//             <Users className="w-10 h-10" />
//           </div>
//           <div className="leading-4">
//             <div className="text-base font-bold text-red-700">{t('label-passengers')}</div>
//             <Popover open={isOpen} onOpenChange={setIsOpen}>
//               <PopoverTrigger>
//                 <button
//                   disabled={!isEditing}
//                   type="button"
//                   className={`actionable text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer' : ''}`}
//                 >
//                   {`${payloadOrder?.cantidadPax} ${t('label-default-passengers')}`}
//                 </button>
//               </PopoverTrigger>
//               <NumberTravelers onChange={value => handleChange('travelers', value)} setIsOpen={setIsOpen} />
//             </Popover>
//           </div>
//         </div>
//
//         {/* Botón Modificar */}
//         <button
//           type="button"
//           onClick={toggleEditing}
//           className={`px-4 py-2 ${isEditing ? 'text-white bg-red-800' : 'text-red-700 bg-white hover:bg-red-50'} rounded-md transition-colors border border-red-200
//           hover:cursor-pointer active:text-red-900 active:border-red-900 flex items-center gap-2 w-full sm:w-auto`}
//         >
//           <Pencil className="w-4 h-4" />
//           {t(isEditing ? 'button-save' : 'button-edit')}
//         </button>
//       </div>
//     </div>
//   )
// }
