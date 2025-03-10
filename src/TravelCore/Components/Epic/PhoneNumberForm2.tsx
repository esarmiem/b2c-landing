import * as React from 'react'
import { CheckIcon, ChevronsUpDown } from 'lucide-react'
import * as RPNInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

// Define the type for the value prop to match your original component
interface PhoneFormValue {
  countryCode: string
  phone: string
}

// Define props interface to match your original component's usage
interface PhoneNumberForm2Props {
  celType?: string
  value?: PhoneFormValue
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  errorsChange: (field: string, value: string) => void
  errors?: { [p: string]: string[] }
  fieldId: string
}

export const PhoneNumberForm2 = React.memo(
  ({ celType, value = { countryCode: 'co', phone: '' }, onChange, errors, errorsChange, fieldId }: PhoneNumberForm2Props) => {
    const { t } = useTranslation(['traveler'], { useSuspense: false })
    const defaultCountry = 'CO' as RPNInput.Country
    const [selectedCountry, setSelectedCountry] = React.useState<RPNInput.Country>(
      value.countryCode ? (value.countryCode.toUpperCase() as RPNInput.Country) : defaultCountry
    )

    // Update selected country when value changes from parent
    React.useEffect(() => {
      if (value.countryCode) {
        setSelectedCountry(value.countryCode.toUpperCase() as RPNInput.Country)
      } else {
        setSelectedCountry(defaultCountry)
      }
    }, [value.countryCode, defaultCountry])

    // Convert phone number format
    const formatPhoneForComponent = (): RPNInput.Value => {
      if (!value.phone) return '' as RPNInput.Value

      const countryCode = RPNInput.getCountryCallingCode(selectedCountry)
      if (!countryCode) return value.phone as RPNInput.Value

      // If phone already includes +, use as is
      if (value.phone.startsWith('+')) return value.phone as RPNInput.Value

      return `+${countryCode}${value.phone}` as RPNInput.Value
    }

    // Handle phone number changes
    const handlePhoneChange = (newValue: RPNInput.Value) => {
      if (!onChange) return

      // Extract just the phone number portion without the country code
      let phoneNumber = newValue || ''
      if (typeof phoneNumber === 'string' && phoneNumber.startsWith('+')) {
        const callingCode = RPNInput.getCountryCallingCode(selectedCountry)
        if (callingCode) {
          phoneNumber = phoneNumber.replace(`+${callingCode}`, '')
        }
      }

      // Create a synthetic event to match the expected onChange format
      const syntheticEvent = {
        target: {
          name: 'phone',
          value: phoneNumber
        }
      } as React.ChangeEvent<HTMLInputElement>
      errorsChange(fieldId, phoneNumber)
      onChange(syntheticEvent)
    }

    // Handle country changes
    const handleCountryChange = (selectedCountry: RPNInput.Country | undefined) => {
      const country = selectedCountry || defaultCountry
      setSelectedCountry(country)

      if (!onChange) return

      // Safely convert to lowercase or use default
      const countryCode = country ? country.toLowerCase() : 'co'

      if (countryCode !== value.countryCode) {
        const countryEvent = {
          target: {
            name: 'countryCode',
            value: countryCode
          }
        } as React.ChangeEvent<HTMLInputElement>

        onChange(countryEvent)
      }
    }
    return (
      <div>
        <label
          htmlFor={`phone-input-${fieldId}`}
          className={`block font-semibold text-gray-500 text-sm mb-1 ${errors?.[fieldId] && errors[fieldId].length > 0 ? 'text-red-500' : ''}`}
        >
          {celType ? celType : t('label-phone')}
        </label>
        <RPNInput.default
          id={`phone-input-${fieldId}`}
          value={formatPhoneForComponent()}
          onChange={handlePhoneChange}
          country={selectedCountry}
          onCountryChange={handleCountryChange}
          international
          countrySelectComponent={CountrySelect}
          flagComponent={FlagComponent}
          inputComponent={InputComponent}
          className={`flex border ${errors?.[fieldId] && errors[fieldId].length > 0 ? 'border-red-500' : 'border-gray-300'} rounded-3xl`}
          smartCaret={false}
          placeholder={t('phone-number-placeholder')}
          defaultCountry={defaultCountry}
        />
        {errors?.[fieldId] && errors[fieldId].length > 0 && <span className="text-xs text-red-500">{errors[fieldId]}</span>}
      </div>
    )
  }
)

const InputComponent = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(({ className, ...props }, ref) => (
  <Input className={cn('flex-1 ml-2 p-6 border-none focus:outline-none focus:ring-0', className)} {...props} ref={ref} />
))
InputComponent.displayName = 'InputComponent'

type CountryEntry = { label: string; value: RPNInput.Country | undefined }

type CountrySelectProps = {
  disabled?: boolean
  value: RPNInput.Country
  options: CountryEntry[]
  onChange: (country: RPNInput.Country) => void
}

const CountrySelect = ({ disabled, value: selectedCountry, options: countryList, onChange }: CountrySelectProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="w-[80px] p-6 border-none focus:outline-none focus:ring-0 flex gap-1 rounded-e-none rounded-s-full"
          disabled={disabled}
        >
          <FlagComponent country={selectedCountry} countryName={selectedCountry} />
          <ChevronsUpDown className={cn('-mr-2 size-4 opacity-50', disabled ? 'hidden' : 'opacity-100')} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <ScrollArea className="h-72">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                    />
                  ) : null
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country
  onChange: (country: RPNInput.Country) => void
}

const CountrySelectOption = ({ country, countryName, selectedCountry, onChange }: CountrySelectOptionProps) => {
  return (
    <CommandItem className="gap-2" onSelect={() => onChange(country)}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-sm text-foreground/50">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
      <CheckIcon className={`ml-auto size-4 ${country === selectedCountry ? 'opacity-100' : 'opacity-0'}`} />
    </CommandItem>
  )
}

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country]

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  )
}
