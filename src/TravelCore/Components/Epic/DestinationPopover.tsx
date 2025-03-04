import useData from '@/TravelCore/Hooks/useData'
import useMasters from '@/TravelCore/Hooks/useMasters'
import type { ArrivalsItems } from '@/TravelCore/Utils/interfaces/Arrivals'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { PopoverContent } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { MapPinHouse } from 'lucide-react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

interface DestinationPopoverProps {
  setDestinationPopoverOpen: (open: boolean) => void
}

export function DestinationPopover({ setDestinationPopoverOpen }: DestinationPopoverProps) {
  const { t } = useTranslation(['home'])
  const master = useMasters()
  const arrivals = master?.arrivals.data?.items as ArrivalsItems[]
  const { data, setData } = useData() || {}
  const origin = data?.payloadOrder?.destino

  const handleDestinationSelect = useCallback(
    (arrivals: ArrivalsItems) => {
      if (setData) {
        setData(prevData => ({
          ...prevData,
          payloadOrder: {
            ...prevData?.payloadOrder,
            destino: arrivals.idDestino
          }
        }))
      }
      setDestinationPopoverOpen(false)
    },
    [setData, setDestinationPopoverOpen]
  )

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      setDestinationPopoverOpen(false)
    }
  }

  return (
    <PopoverContent className="w-3/4 p-0 items-center m-auto" onKeyDown={handleKeyDown}>
      <Command>
        <CommandInput placeholder={t('placeholder-dropdown-destination') || 'Search destination...'} />
        <CommandList>
          <CommandEmpty>{t('search-dropdown-destination-empty') || 'No destination found'}</CommandEmpty>
          <CommandGroup>
            {arrivals?.map(arrival => (
              <CommandItem key={arrival.idDestino} onSelect={() => handleDestinationSelect(arrival)}>
                <MapPinHouse className={cn('mr-2 h-4 w-4', origin === arrival.idDestino ? 'opacity-100' : 'opacity-0')} />
                {arrival.descripcion}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  )
}
