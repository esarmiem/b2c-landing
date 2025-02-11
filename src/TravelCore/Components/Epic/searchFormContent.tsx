import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown, MapPin, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { TravelersModal } from "./travelersModal";
import { TravelButtonForm } from "./TravelButtonForm";
import { useTranslation } from "react-i18next";

const destinations = [
  "New York",
  "Paris",
  "Tokyo",
  "London",
  "Rome",
  "Barcelona",
  "Dubai",
];

export function SearchFormContent() {
  const { t } = useTranslation(["home"]);
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<DateRange | undefined>();
  const [open, setOpen] = useState(false);
  const [travelers, setTravelers] = useState(1);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null); // Estado para controlar el Tooltip activo

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-red-700 rounded-lg md:rounded-full shadow-lg p-4 -mt-7">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between rounded-full overflow-hidden whitespace-nowrap flex-col h-auto items-start"
          >
            <div className="items-center gap-2 hidden md:flex">
              <span className="text-sm text-muted-foreground">Where to?</span>
              <TooltipProvider>
                <Tooltip
                  open={activeTooltip === "destination"} // Controla si este Tooltip está abierto
                  onOpenChange={(open) =>
                    setActiveTooltip(open ? "destination" : null)
                  }
                >
                  <TooltipTrigger asChild>
                    <span
                      onMouseEnter={() => setActiveTooltip("destination")}
                      onMouseLeave={() => setActiveTooltip(null)}
                    >
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64">
                      Choose from our curated list of popular destinations. Each
                      location offers unique experiences and attractions.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="text-ellipsis overflow-hidden">
                {destination || t("label-dropdown-destination")}
              </span>
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={t("placeholder-dropdown-destination")} />
            <CommandList>
              <CommandEmpty>
                {t("search-dropdown-destination-empty")}
              </CommandEmpty>
              <CommandGroup>
                {destinations.map((dest) => (
                  <CommandItem
                    key={dest}
                    onSelect={() => {
                      setDestination(dest);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        destination === dest ? "opacity-100" : "opacity-0"
                      )}
                    />
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
            className="justify-between text-left font-normal rounded-full overflow-hidden whitespace-nowrap flex-col h-auto items-start"
          >
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-muted-foreground">When?</span>
              <TooltipProvider>
                <Tooltip
                  open={activeTooltip === "dates"} // Controla si este Tooltip está abierto
                  onOpenChange={(open) =>
                    setActiveTooltip(open ? "dates" : null)
                  }
                >
                  <TooltipTrigger asChild>
                    <span
                      onMouseEnter={() => setActiveTooltip("dates")}
                      onMouseLeave={() => setActiveTooltip(null)}
                    >
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64">
                      Choose your check-in and check-out dates. Prices may vary
                      based on the selected dates and availability.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span className="text-ellipsis overflow-hidden">
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>{t("label-between-dates")}</span>
                )}
              </span>
            </div>
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

      <TravelButtonForm />
    </div>
  );
}

export default SearchFormContent;