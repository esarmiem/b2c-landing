import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { memo, useState } from 'react'
import type { CountriesItems } from '@/TravelCore/Utils/interfaces/countries'
import type { CitiesItems } from '@/TravelCore/Utils/interfaces/Cities'
import { useTranslation } from 'react-i18next'

interface SearchCountryComponentProps {
  label: string
  name: string
  value: string
  placeholder: string
  errors?: { [p: string]: string[] }
  onValueChange: (value: string) => void
  options: CountriesItems[] | CitiesItems[]
  type: 'country' | 'city'
  disabled?: boolean
}

export const SearchCountryComponent = memo(
  ({ label, name, value, placeholder, errors, onValueChange, options, type, disabled = false }: SearchCountryComponentProps) => {
    const [open, setOpen] = useState(false)
    const hasError = errors?.[name] && errors[name].length > 0

    const selectedItem = options.find(item => {
      if (type === 'country') {
        return (item as CountriesItems).idPais.toString() === value
      }
      return (item as CitiesItems).idCiudad.toString() === value
    })

    const { t } = useTranslation(['invoice'])

    const getDisplayValue = () => {
      if (!selectedItem) return ''
      return type === 'country'
        ? (selectedItem as CountriesItems).descripcion
        : (selectedItem as CitiesItems).descripcion
    }

    return (
      <div className="space-y-2">
        <label className={`block font-semibold text-gray-500 text-sm mb-1 ${hasError ? 'text-red-500' : ''}`}>
          {label}
        </label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={`w-full justify-between rounded-3xl border-gray-300 p-6 ${hasError ? 'border-red-500' : ''}`}
              disabled={disabled}
            >
              {getDisplayValue() || placeholder}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder={`${t('country-search')}...`} />
              <CommandList>
                <CommandEmpty>{t('not-found')}</CommandEmpty>
                <CommandGroup>
                  {options.map(item => {
                    const itemValue = type === 'country' 
                      ? (item as CountriesItems).idPais.toString()
                      : (item as CitiesItems).idCiudad.toString()
                    const itemLabel = type === 'country'
                      ? (item as CountriesItems).descripcion
                      : (item as CitiesItems).descripcion

                    return (
                      <CommandItem
                        key={itemValue}
                        value={itemLabel}
                        onSelect={() => {
                          onValueChange(itemValue)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            value === itemValue ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        {itemLabel}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {hasError && <span className="text-xs text-red-500">{errors[name]}</span>}
      </div>
    )
  }
)

SearchCountryComponent.displayName = 'SearchCountryComponent'