import useData from '@/TravelCore/Hooks/useData'
import useMasters from '@/TravelCore/Hooks/useMasters'
import type { ArrivalsItems } from '@/TravelCore/Utils/interfaces/Arrivals.ts'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { TFunction } from 'i18next'
import { Check, ChevronsUpDown, Info, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'

interface DestinationSelectorProps {
  activeTooltip: string | null
  setActiveTooltip: (tooltip: string | null) => void
  t: TFunction<string[], undefined>
  onChange: (value: string) => void
  errors?: string[]
}

export function DestinationSelector({ activeTooltip, setActiveTooltip, t, onChange, errors }: DestinationSelectorProps) {
  const master = useMasters()
  const arrivals = master?.arrivals.data?.items as ArrivalsItems[]
  const { data, setData } = useData() || {}
  const payloadOrder = data?.payloadOrder
  const selectDestination = arrivals?.find(dest => dest.idDestino === payloadOrder?.destino)?.descripcion
  const [open, setOpen] = useState(false)
  const [origin, setOrigin] = useState<string>('')

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(payloadOrder => {
        setOrigin(payloadOrder.country_name)
      })
      .catch(() => {
        setOrigin('Unknown')
      })
  }, [])

  const handleOriginChange = (newOrigin: string) => {
    setOrigin(newOrigin)
  }

  const handleSelectDestination = (dest: ArrivalsItems) => {
    onChange(dest.descripcion)
    setData?.(prevData => ({
      ...prevData,
      payloadOrder: {
        ...prevData?.payloadOrder,
        destino: dest.idDestino,
        pais: 'CO',
        idUser: '5'
      }
    }))
  }
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (payloadOrder?.destino) {
      onChange(selectDestination || '')
    }
  }, [payloadOrder?.destino])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          className="justify-between rounded-full overflow-hidden whitespace-nowrap flex-col h-auto items-start"
        >
          <div className="items-center gap-2 hidden md:flex">
            <span className={`text-sm text-muted-foreground ${errors && errors?.length > 0 ? 'text-red-500' : ''}`}>
              {errors && errors?.length > 0 ? errors : t('placeholder-tooltip-destination')}
            </span>
            <TooltipProvider>
              <Tooltip open={activeTooltip === 'destination'} onOpenChange={open => setActiveTooltip(open ? 'destination' : null)}>
                <TooltipTrigger asChild>
                  <span onMouseEnter={() => setActiveTooltip('destination')} onMouseLeave={() => setActiveTooltip(null)}>
                    <Info className={`h-4 w-4 text-muted-foreground cursor-help ${errors && errors?.length > 0 ? 'text-red-500' : ''}`} />
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-64">{t('tooltip-destination')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <div className={`flex items-center gap-2 ${errors && errors?.length > 0 ? 'hidden sm:flex' : ''}`}>
              <MapPin className="h-4 w-4" />
              <span className="text-ellipsis overflow-hidden">{selectDestination || t('label-dropdown-destination')}</span>
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
            <span
              className={`flex items-center gap-2 sm:hidden text-ellipsis overflow-hidden ${errors && errors?.length > 0 ? 'text-red-500' : ''}`}
            >
              <Info className={`h - 4 w-4 text-muted-foreground cursor-help ${errors && errors?.length > 0 ? 'text-red-500' : ''}`} />
              {errors && errors?.length > 0 ? errors : ''}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={t('placeholder-dropdown-destination')} />
          <CommandList>
            <CommandEmpty>{t('search-dropdown-destination-empty')}</CommandEmpty>
            <CommandGroup>
              <CommandItem
                className="font-semibold"
                onSelect={() => {
                  const newOrigin = prompt('Enter your origin country:', origin)
                  if (newOrigin !== null) {
                    handleOriginChange(newOrigin)
                  }
                }}
              >
                <Check className={cn('mr-2 h-4 w-4', origin ? 'opacity-100' : 'opacity-0')} />
                {t('label-dropdown-change-origin')} {origin}
              </CommandItem>
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
  )
}
