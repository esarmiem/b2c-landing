import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { CalendarIcon, Info } from "lucide-react";
import { DateRange } from "react-day-picker";

interface DateSelectorProps {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  activeTooltip: string | null;
  setActiveTooltip: (tooltip: string | null) => void;
  t: (key: string) => string;
}

export function DateSelector({ 
  date, 
  setDate, 
  activeTooltip, 
  setActiveTooltip,
  t 
}: DateSelectorProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="justify-between text-left font-normal rounded-full overflow-hidden whitespace-nowrap flex-col h-auto items-start"
        >
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{t("placeholder-tooltip-dates")}</span>
            <TooltipProvider>
              <Tooltip
                open={activeTooltip === "dates"}
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
                    {t("tooltip-dates")}
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
  );
}

export default DateSelector;