import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useTranslation } from "react-i18next";
import { DestinationSelector } from "./DestinationSelector";
import { DateSelector } from "./DateSelector";
import { TravelersPopover } from "./TravelersPopover";
import { TravelButtonForm } from "./TravelButtonForm";

export function SearchFormContent() {
  const { t } = useTranslation(["home"]);
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<DateRange | undefined>();
  const [travelers, setTravelers] = useState(1);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-red-700 rounded-lg md:rounded-full shadow-lg p-4 -mt-7">
      <DestinationSelector
        destination={destination}
        setDestination={setDestination}
        activeTooltip={activeTooltip}
        setActiveTooltip={setActiveTooltip}
        t={t}
      />

      <DateSelector
        date={date}
        setDate={setDate}
        activeTooltip={activeTooltip}
        setActiveTooltip={setActiveTooltip}
        t={t}
      />

      <TravelersPopover travelers={travelers} setTravelers={setTravelers} />

      <TravelButtonForm />
    </div>
  );
}

export default SearchFormContent;