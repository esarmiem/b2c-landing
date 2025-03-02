import { ArrowRight, Calendar, Check, Earth, Pencil, PlaneTakeoff } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { OriginPopover } from '@/TravelCore/Components/Epic/OriginPopover.tsx'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import useMasters from '@/TravelCore/Hooks/useMasters.ts'
import type { ArrivalsItems } from '@/TravelCore/Utils/interfaces/Arrivals.ts'
import type { CountriesItems } from '@/TravelCore/Utils/interfaces/countries.ts'
import useData from '@/TravelCore/Hooks/useData.ts'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command.tsx'
import { cn } from '@/lib/utils.ts'
import { format } from 'date-fns'
import { Calendar as Datepicker } from '@/components/ui/calendar'
import { TravelersPopover } from '@/TravelCore/Components/Epic/TravelersPopover.tsx'
import { useMessageTranslations } from '@/TravelCore/Utils/validations/useMessageTranslations.ts'

export const FilterForm = () => {
  const master = useMasters()
  const arrivals = master?.arrivals.data?.items as ArrivalsItems[]
  const countries = master?.countries?.data?.items as CountriesItems[]

  const { data, setData } = useData() || {}
  const payloadOrder = data?.payloadOrder
  const origin = countries?.find(country => country.codigoISO === (payloadOrder?.pais ? payloadOrder?.pais : 'CO'))?.descripcion
  const msg = useMessageTranslations()

  const { t } = useTranslation(['products'])
  const [isEditing, setIsEditing] = useState(false)
  const [originPopoverOpen, setOriginPopoverOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date>(payloadOrder?.salida ? new Date(payloadOrder.salida) : new Date())

  const handleSelectDestination = (dest: ArrivalsItems) => {
    setData?.(prevData => ({
      ...prevData,
      payloadOrder: {
        ...prevData?.payloadOrder,
        destino: dest.idDestino,
        idUser: '5'
      }
    }))
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
        {/* Origen */}
        <div className="flex items-end gap-2 w-full sm:w-1/2 md:w-auto">
          <div className="text-red-700">
            <Earth className="w-10 h-10" />
          </div>
          <div className="leading-4 space-y-0.5">
            <div className="text-base font-bold text-red-700">{t('label-origin')}</div>
            <Popover open={originPopoverOpen} onOpenChange={setOriginPopoverOpen}>
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
          <div className="text-black">
            <PlaneTakeoff className="w-10 h-10" />
          </div>
          <div className="leading-4 space-y-0.5">
            <div className="text-base font-bold text-red-700">{t('label-destination')}</div>
            <Popover open={open} onOpenChange={setOpen}>
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
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder={t('placeholder-dropdown-destination')} />
                  <CommandList>
                    <CommandEmpty>{t('search-dropdown-destination-empty')}</CommandEmpty>
                    <CommandGroup>
                      {arrivals?.map(dest => (
                        <CommandItem
                          key={dest.idDestino}
                          onSelect={() => {
                            handleSelectDestination(dest)
                            setOpen(false)
                          }}
                        >
                          <Check className={cn('mr-2 h-4 w-4', payloadOrder?.destino === dest.idDestino ? 'opacity-100' : 'opacity-0')} />
                          {dest.descripcion}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
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
            <Popover>
              <PopoverTrigger asChild>
                <button
                  disabled={!isEditing}
                  type="button"
                  className={`actionable flex text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer' : ''}`}
                >
                  {date ? format(date, 'PPP') : <span>{t('label-default-from-date')}</span>}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 items-center m-auto">
                <Datepicker mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div className="text-black">
            <ArrowRight className="w-5 h-5" />
          </div>
          <div className="leading-4 space-y-0.5">
            <div className="text-base font-bold text-red-700">{t('label-to')}</div>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  disabled={!isEditing}
                  type="button"
                  className={`actionable text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer' : ''}`}
                >
                  {t('label-default-to-date')}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 items-center m-auto">
                <Datepicker mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Pasajeros */}
        <div className="flex items-end gap-2 w-full sm:w-1/2 md:w-auto">
          <TravelersPopover />
          {/*<div className="text-red-700">*/}
          {/*  <Users className="w-10 h-10" />*/}
          {/*</div>*/}
          {/*<div className="leading-4">*/}
          {/*  <div className="text-base font-bold text-red-700">{t('label-passengers')}</div>*/}
          {/*  <Popover>*/}
          {/*    <PopoverTrigger>*/}
          {/*      <button type="button" className={`actionable text-sm mt-0 px-2 ${isEditing ? 'bg-zinc-200 cursor-pointer' : ''}`}>*/}
          {/*        {t('label-default-passengers')}*/}
          {/*      </button>*/}
          {/*    </PopoverTrigger>*/}
          {/*    <PopoverContent>*/}
          {/*      */}
          {/*    </PopoverContent>*/}
          {/*  </Popover>*/}
          {/*</div>*/}
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
