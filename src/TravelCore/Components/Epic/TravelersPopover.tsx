import * as React from "react";
import { Info, Minus, Plus, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";
import useData from "@/TravelCore/Hooks/useData.ts";

interface TravelerAge {
  id: number;
  age: string;
}

interface TravelersPopoverProps {
  travelers: number;
  setTravelers: (value: number) => void;
}

export const TravelersPopover: React.FC<TravelersPopoverProps> = ({travelers, setTravelers}) => {
  const { t } = useTranslation(["home"]);
  const { data, setData } = useData() || {};
  const payloadOrder = data?.payloadOrder;
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeTooltip, setActiveTooltip] = React.useState<string | null>(null);

  const initialAges = React.useMemo(() => {
    if(payloadOrder?.edades){
      return payloadOrder.edades.split(',').map((age, index) => ({
        id: index + 1,
        age: age.trim()
      }))
    }
    return [{ id: 1, age: "0" }]
  }, [payloadOrder?.edades]);

  const [ages, setAges] = React.useState<TravelerAge[]>(initialAges);

  React.useEffect(() => {
    if (setData) {
      const formattedAges = ages.map((age) => age.age).join(",")
      setData((prevData) => ({
        ...prevData,
        payloadOrder: {
          ...prevData?.payloadOrder,
          cantidadPax: travelers,
          edades: formattedAges,
        }
      }))
    }
  }, [travelers, ages]);

  React.useEffect(() => {
    if (payloadOrder?.cantidadPax) {
      setTravelers(payloadOrder.cantidadPax);
    }
  }, [payloadOrder, setTravelers]);

  const handleAddTraveler = () => {
    if (travelers < 9) {
      setTravelers(travelers + 1);
      setAges([...ages, { id: ages.length + 1, age: "0" }]);
    }
  };

  const handleRemoveTraveler = (idToRemove: number) => {
    if (travelers > 1) {
      setTravelers(travelers - 1);
      setAges(
        ages
          .filter((age) => age.id !== idToRemove)
          .map((age, index) => ({
            ...age,
            id: index + 1,
          }))
      );
    }
  };

  const handleAgeChange = (id: number, value: string) => {
    setAges(ages.map((age) => (age.id === id ? { ...age, age: value } : age)));
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="justify-between rounded-full overflow-hidden whitespace-nowrap flex-col h-auto items-start"
        >
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {t("placeholder-count-travelers")}
            </span>
            <TooltipProvider>
              <Tooltip
                open={activeTooltip === "travelers"}
                onOpenChange={(open) =>
                  setActiveTooltip(open ? "travelers" : null)
                }
              >
                <TooltipTrigger asChild>
                  <span
                    onMouseEnter={() => setActiveTooltip("travelers")}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-64">{t("tooltip-travelers")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="text-ellipsis overflow-hidden">
              {travelers}{" "}
              {travelers === 1
                ? t("content-select-travelers")
                : t("content-select-travelers") + "s"}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto" align="start" side="bottom">
        <div className="flex flex-col max-h-[320px]">
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>{t("label-select-count-travelers")}</span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      handleRemoveTraveler(ages[ages.length - 1].id)
                    }
                    disabled={travelers <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="min-w-8 text-center">{travelers}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleAddTraveler}
                    disabled={travelers >= 9} // Agregamos esta propiedad
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {ages.map((traveler) => (
                <React.Fragment key={traveler.id}>
                  <Separator />
                  <div className="flex items-center justify-between gap-4">
                    <span className="min-w-[100px]">
                      {t("label-input-age-travelers")} {traveler.id}
                    </span>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={traveler.age}
                        onChange={(e) =>
                          handleAgeChange(traveler.id, e.target.value)
                        }
                        className="w-20"
                        min="0"
                        max="120"
                      />
                      <span>{t("label-input-age-travelers-sufix")}</span>
                      {/* Botón siempre presente, pero invisible y no interactuable cuando travelers === 1 */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        style={{
                          opacity: payloadOrder?.cantidadPax as number > 1 ? 1 : 0,
                          pointerEvents: payloadOrder?.cantidadPax as number > 1 ? "auto" : "none",
                        }}
                        onClick={() => handleRemoveTraveler(traveler.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="sticky bottom-0 pt-4 bg-white">
            <Button
              className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full"
              onClick={() => setIsOpen(false)}
            >
              {t("action-apply")}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};