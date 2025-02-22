import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { PopoverContent } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { MapPinHouse } from 'lucide-react'
import { TFunction } from 'i18next'

interface OriginPopoverProps {
  origin: string
  onOriginChange: (value: string) => void
  t: TFunction
}

// Lista de países para el selector de origen
const countries = [
  'Argentina', 'Brasil', 'Chile', 'Colombia', 'Ecuador', 
  'España', 'Estados Unidos', 'México', 'Perú', 'Venezuela',
  'Canadá', 'Francia', 'Italia', 'Alemania', 'Reino Unido',
  'Japón', 'China', 'Australia', 'Nueva Zelanda', 'Rusia'
]

export function OriginPopover({ origin, onOriginChange, t }: OriginPopoverProps) {
  const handleOriginSelect = (country: string) => {
    onOriginChange(country)
  }

  return (
    <PopoverContent className="w-full p-0">
      <Command>
        <CommandInput placeholder={t('placeholder-dropdown-origin') || 'Search country...'} />
        <CommandList>
          <CommandEmpty>{t('search-dropdown-origin-empty') || 'No country found'}</CommandEmpty>
          <CommandGroup>
            {countries.map(country => (
              <CommandItem
                key={country}
                onSelect={() => handleOriginSelect(country)}
              >
                <MapPinHouse className={cn('mr-2 h-4 w-4', origin === country ? 'opacity-100' : 'opacity-0')} />
                {country}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  )
}