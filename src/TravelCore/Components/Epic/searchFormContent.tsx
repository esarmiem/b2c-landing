import {MouseEvent, useState} from "react";
import { useTranslation } from "react-i18next";
import { DestinationSelector } from "./DestinationSelector";
import { DateSelector } from "./DateSelector";
import { TravelersPopover } from "./TravelersPopover";
import { TravelButtonForm } from "./TravelButtonForm";

interface SearchFormContentProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function SearchFormContent({onClick}: SearchFormContentProps) {
  const { t } = useTranslation(["home"]);
  const [travelers, setTravelers] = useState(1);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-red-700 rounded-lg md:rounded-full shadow-lg p-4 -mt-7">
      <DestinationSelector
        activeTooltip={activeTooltip}
        setActiveTooltip={setActiveTooltip}
        t={t}
      />

      <DateSelector
        activeTooltip={activeTooltip}
        setActiveTooltip={setActiveTooltip}
        t={t}
      />

      <TravelersPopover travelers={travelers} setTravelers={setTravelers} />

      <TravelButtonForm onClick={onClick} />
    </div>
  );
}