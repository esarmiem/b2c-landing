import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Check, ChevronsUpDown, MapPin, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const destinations = [
  "New York",
  "Paris",
  "Tokyo",
  "London",
  "Rome",
  "Barcelona",
  "Dubai",
];

interface DestinationSelectorProps {
  destination: string;
  setDestination: (destination: string) => void;
  activeTooltip: string | null;
  setActiveTooltip: (tooltip: string | null) => void;
  t: (key: string) => string;
}

export function DestinationSelector({ 
  destination, 
  setDestination, 
  activeTooltip, 
  setActiveTooltip,
  t 
}: DestinationSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between rounded-full overflow-hidden whitespace-nowrap flex-col h-auto items-start"
        >
          <div className="items-center gap-2 hidden md:flex">
            <span className="text-sm text-muted-foreground">{t("placeholder-tooltip-destination")}</span>
            <TooltipProvider>
              <Tooltip
                open={activeTooltip === "destination"}
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
                    {t("tooltip-destination")}
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
  );
}

export default DestinationSelector;