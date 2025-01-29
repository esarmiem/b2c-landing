import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { TravelersModal } from "./travelersModal"
import { DateRange } from "react-day-picker"

const destinations = ["New York", "Paris", "Tokyo", "London", "Rome", "Barcelona", "Dubai"]

interface CustomDateRange {
  from: Date;
  to: Date;
}

export function SearchFormContent() {
  const [destination, setDestination] = useState("")
  const [date, setDate] = useState<CustomDateRange | undefined>()
  const [open, setOpen] = useState(false)
  const [travelers, setTravelers] = useState(1)

  const handleDateSelect = (selectedDateRange: DateRange | undefined) => {
    if (selectedDateRange?.from && selectedDateRange?.to) {
      setDate({
        from: selectedDateRange.from,
        to: selectedDateRange.to
      })
    } else {
      setDate(undefined)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between rounded-full">
            {destination || "Seleccionar destino"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Buscar destino..." />
            <CommandList>
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
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
              <span>Seleccionar fechas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={{
              from: date?.from,
              to: date?.to
            }}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <TravelersModal travelers={travelers} setTravelers={setTravelers} />

      <Button className="bg-red-600 hover:bg-red-700 rounded-full">Buscar</Button>
    </div>
  )
}