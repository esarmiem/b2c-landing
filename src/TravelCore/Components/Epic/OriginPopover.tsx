import useData from '@/TravelCore/Hooks/useData'
import useMasters from '@/TravelCore/Hooks/useMasters'
import type { CountriesItems } from '@/TravelCore/Utils/interfaces/countries'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { PopoverContent } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import type { TFunction } from 'i18next'
import { MapPinHouse } from 'lucide-react'
import { useCallback } from 'react'

interface OriginPopoverProps {
  t: TFunction
  setOriginPopoverOpen: (open: boolean) => void
}

export function OriginPopover({ t, setOriginPopoverOpen }: OriginPopoverProps) {
  const master = useMasters()
  const countries = master?.countries?.data?.items as CountriesItems[]
  const { data, setData } = useData() || {}
  const origin = data?.payloadOrder?.pais

  // Función para ordenar los países alfabéticamente por descripción
  const sortedCountries = countries?.slice().sort((a, b) => {
    if (a.descripcion < b.descripcion) return -1
    if (a.descripcion > b.descripcion) return 1
    return 0
  })

  const handleOriginSelect = useCallback(
    (country: CountriesItems) => {
      if (setData) {
        setData(prevData => ({
          ...prevData,
          payloadOrder: {
            ...prevData?.payloadOrder,
            pais: country.codigoISO
          }
        }))
      }
      setOriginPopoverOpen(false)
    },
    [setData, setOriginPopoverOpen]
  )

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      setOriginPopoverOpen(false)
    }
  }

  return (
    <PopoverContent className="w-3/4 p-0 items-center m-auto" onKeyDown={handleKeyDown}>
      <Command>
        <CommandInput placeholder={t('placeholder-dropdown-origin') || 'Search country...'} />
        <CommandList>
          <CommandEmpty>{t('search-dropdown-origin-empty') || 'No country found'}</CommandEmpty>
          <CommandGroup>
            {sortedCountries?.map(country => (
              <CommandItem key={country.codigoISO} onSelect={() => handleOriginSelect(country)}>
                <MapPinHouse
                  className={cn('mr-2 h-4 w-4', origin === country.codigoISO ? 'opacity-100' : 'opacity-0')}
                />
                {country.descripcion}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  )
}