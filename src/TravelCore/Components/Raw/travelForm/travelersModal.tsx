import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Users } from "lucide-react"

interface TravelerAge {
  id: number
  age: string
}

interface TravelersModalProps {
  travelers: number
  setTravelers: (value: number) => void
}

export function TravelersModal({ travelers, setTravelers }: TravelersModalProps) {
  const [ages, setAges] = useState<TravelerAge[]>([{ id: 1, age: "" }])

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
        <Button variant="outline" className="justify-start rounded-full">
          <Users className="mr-2 h-4 w-4" />
          {travelers} {travelers === 1 ? "Viajero" : "Viajeros"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Número de viajeros</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between px-4">
            <span>Viajeros</span>
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
              <span className="min-w-[100px]">Edad viajero {traveler.id}</span>
              <div className="flex items-center gap-2 flex-1">
                <Input
                  type="number"
                  value={traveler.age}
                  onChange={(e) => handleAgeChange(traveler.id, e.target.value)}
                  className="w-20"
                  min="0"
                  max="120"
                />
                <span>años</span>
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
                  Eliminar
                </Button>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

