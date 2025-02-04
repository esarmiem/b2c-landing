import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {format} from "date-fns"
import {CalendarIcon, Check, ChevronsUpDown} from "lucide-react"
import {cn} from "@/lib/utils"
import {DateRange} from "react-day-picker"
import {TravelersModal} from "./travelersModal"
import {TravelButtonForm} from "./TravelButtonForm.tsx"
import {useTranslation} from "react-i18next";

const destinations = ["New York", "Paris", "Tokyo", "London", "Rome", "Barcelona", "Dubai"]

export function SearchFormContent() {
  const { t } = useTranslation(["home"])
  const [destination, setDestination] = useState("")
  const [date, setDate] = useState<DateRange | undefined>()
  const [open, setOpen] = useState(false)
  const [travelers, setTravelers] = useState(1)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between rounded-full">
            {destination || t('label-dropdown-destination') }
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder= {t('placeholder-dropdown-destination')}/>
            <CommandList>
              <CommandEmpty>{t('search-dropdown-destination-empty')}</CommandEmpty>
              <CommandGroup>
                {destinations.map((dest) => (
                  <CommandItem
                    key={dest}
                    onSelect={() => {
                      setDestination(dest)
                      setOpen(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", destination === dest ? "opacity-100" : "opacity-0")} />
                    {dest}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("justify-start text-left font-normal rounded-full", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>{t('label-between-dates')}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <TravelersModal travelers={travelers} setTravelers={setTravelers} />

      <TravelButtonForm/>
    </div>
  )
}

