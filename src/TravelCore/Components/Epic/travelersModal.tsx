import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Info, Minus, Plus, Users } from "lucide-react"
import { useTranslation } from "react-i18next"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface TravelerAge {
  id: number
  age: string
}

interface TravelersModalProps {
  travelers: number
  setTravelers: (value: number) => void
}

export function TravelersModal({ travelers, setTravelers }: TravelersModalProps) {
  const { t } = useTranslation(["home"])
  const [ages, setAges] = useState<TravelerAge[]>([{ id: 1, age: "" }])
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  const handleAddTraveler = () => {
    setTravelers(travelers + 1)
    setAges([...ages, { id: ages.length + 1, age: "" }])
  }

  const handleRemoveTraveler = () => {
    if (travelers > 1) {
      setTravelers(travelers - 1)
      setAges(ages.slice(0, -1))
    }
  }

  const handleAgeChange = (id: number, value: string) => {
    setAges(ages.map((age) => (age.id === id ? { ...age, age: value } : age)))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="justify-between rounded-full overflow-hidden whitespace-nowrap flex-col h-auto items-start">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">How many?</span>
            <TooltipProvider>
              <Tooltip
                open={activeTooltip === "travelers"}
                onOpenChange={(open) => setActiveTooltip(open ? "travelers" : null)}
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
                  <p className="w-64">Specify the number of travelers and their ages. This helps us provide accurate pricing and recommendations for your group.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="text-ellipsis overflow-hidden">
              {travelers} {travelers === 1 ? t('content-select-travelers') : t('content-select-travelers') + "s"}
            </span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('title-modal-travelers')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between px-4">
            <span>{t('label-select-count-travelers')}</span>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={handleRemoveTraveler} disabled={travelers <= 1}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{travelers}</span>
              <Button variant="outline" size="icon" onClick={handleAddTraveler}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {ages.map((traveler) => (
            <div key={traveler.id} className="flex items-center gap-4 px-4">
              <span className="min-w-[100px]">{t('label-input-age-travelers')} {traveler.id}</span>
              <div className="flex items-center gap-2 flex-1">
                <Input
                  type="number"
                  value={traveler.age}
                  onChange={(e) => handleAgeChange(traveler.id, e.target.value)}
                  className="w-20"
                  min="0"
                  max="120"
                />
                <span>{t('label-input-age-travelers-sufix')}</span>
              </div>
              {travelers > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setTravelers(travelers - 1)
                    setAges(ages.filter((age) => age.id !== traveler.id))
                  }}
                >
                  {t('action-input-travelers')}
                </Button>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}