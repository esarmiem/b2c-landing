import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// Define the type for the value prop to match your original component
interface PhoneFormValue {
  countryCode: string;
  phone: string;
}

// Define props interface to match your original component's usage
interface PhoneNumberForm2Props {
  celType?: string;
  value?: PhoneFormValue;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PhoneNumberForm2 = React.memo(
  ({ celType, value = { countryCode: "co", phone: "" }, onChange }: PhoneNumberForm2Props) => {
    const { t } = useTranslation(["traveler"], { useSuspense: false });
    const defaultCountry = "CO" as RPNInput.Country;
    const [selectedCountry, setSelectedCountry] = React.useState<RPNInput.Country>(
      value.countryCode ? (value.countryCode.toUpperCase() as RPNInput.Country) : defaultCountry
    );
    
    // Update selected country when value changes from parent
    React.useEffect(() => {
      if (value.countryCode) {
        setSelectedCountry(value.countryCode.toUpperCase() as RPNInput.Country);
      } else {
        setSelectedCountry(defaultCountry);
      }
    }, [value.countryCode]);

    // Convert phone number format
    const formatPhoneForComponent = (): RPNInput.Value => {
      if (!value.phone) return "" as RPNInput.Value;
      
      const countryCode = RPNInput.getCountryCallingCode(selectedCountry);
      if (!countryCode) return value.phone as RPNInput.Value;
      
      // If phone already includes +, use as is
      if (value.phone.startsWith('+')) return value.phone as RPNInput.Value;
      
      return `+${countryCode}${value.phone}` as RPNInput.Value;
    };

    // Handle phone number changes
    const handlePhoneChange = (newValue: RPNInput.Value) => {
      if (!onChange) return;
      
      // Extract just the phone number portion without the country code
      let phoneNumber = newValue || "";
      if (typeof phoneNumber === 'string' && phoneNumber.startsWith('+')) {
        const callingCode = RPNInput.getCountryCallingCode(selectedCountry);
        if (callingCode) {
          phoneNumber = phoneNumber.replace(`+${callingCode}`, '');
        }
      }

      // Create a synthetic event to match the expected onChange format
      const syntheticEvent = {
        target: {
          name: "phone",
          value: phoneNumber,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      
      onChange(syntheticEvent);
    };

    // Handle country changes
    const handleCountryChange = (country: RPNInput.Country | undefined) => {
      if (!country) {
        country = defaultCountry;
      }
      
      setSelectedCountry(country);
      
      if (!onChange) return;
      
      // Safely convert to lowercase or use default
      const countryCode = country ? country.toLowerCase() : "co";
      
      if (countryCode !== value.countryCode) {
        const countryEvent = {
          target: {
            name: "countryCode",
            value: countryCode,
          },
        } as React.ChangeEvent<HTMLInputElement>;
        
        onChange(countryEvent);
      }
    };

    return (
      <div>
        <label className="block font-semibold text-gray-500 text-sm mb-1">
          {celType ? celType : t("label-phone")}
        </label>
        <RPNInput.default
          value={formatPhoneForComponent()}
          onChange={handlePhoneChange}
          country={selectedCountry}
          onCountryChange={handleCountryChange}
          international
          countrySelectComponent={CountrySelect}
          flagComponent={FlagComponent}
          inputComponent={InputComponent}
          className="flex border border-gray-300 rounded-3xl"
          smartCaret={false}
          placeholder={t("phone-number-placeholder")}
          defaultCountry={defaultCountry}
        />
      </div>
    );
  }
);

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
  <Input
    className={cn("flex-1 ml-2 p-6 border-none focus:outline-none focus:ring-0", className)}
    {...props}
    ref={ref}
  />
));
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="w-[80px] p-6 border-none focus:outline-none focus:ring-0 flex gap-1 rounded-e-none rounded-s-full"
          disabled={disabled}
        >
          <FlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />
          <ChevronsUpDown
            className={cn(
              "-mr-2 size-4 opacity-50",
              disabled ? "hidden" : "opacity-100",
            )}
          />
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
                  ) : null,
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
}: CountrySelectOptionProps) => {
  return (
    <CommandItem className="gap-2" onSelect={() => onChange(country)}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-sm text-foreground/50">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
      <CheckIcon
        className={`ml-auto size-4 ${country === selectedCountry ? "opacity-100" : "opacity-0"}`}
      />
    </CommandItem>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};