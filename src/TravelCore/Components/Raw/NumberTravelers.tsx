import { PopoverContent } from '@/components/ui/popover.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Separator } from '@/components/ui/separator.tsx'
import { Input } from '@/components/ui/input.tsx'
import { useEffect, useMemo, useState } from 'react'
import useData from '@/TravelCore/Hooks/useData.ts'
import { useTranslation } from 'react-i18next'

interface TravelerAge {
  id: number
  age: string
}

interface NumberTravelersProps {
  onChange: (value: string) => void
  setIsOpen: (value: boolean) => void
}

export function NumberTravelers({ onChange, setIsOpen }: NumberTravelersProps) {
  const { t } = useTranslation(['home'])
  const { data, setData } = useData() || {}
  const payloadOrder = data?.payloadOrder
  const [travelers, setTravelers] = useState(payloadOrder?.cantidadPax || 1)

  // Age Management
  const initialAges = useMemo(() => {
    if (payloadOrder?.edades) {
      return payloadOrder.edades.split(',').map((age, index) => ({
        id: index + 1,
        age: age.trim() || '0'
      }))
    }
    return [{ id: 1, age: '0' }]
  }, [payloadOrder?.edades])
  const [ages, setAges] = useState<TravelerAge[]>(initialAges)
  const formattedAges = ages.map(age => age.age).join(',')

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (payloadOrder?.edades || ages.some(age => age.age !== '' && age.age !== '0')) {
      onChange?.(formattedAges)
    }

    if (setData) {
      setData(prevData => ({
        ...prevData,
        payloadOrder: {
          ...prevData?.payloadOrder,
          cantidadPax: travelers,
          edades: formattedAges !== '0' && formattedAges !== '' ? formattedAges : undefined
        }
      }))
    }
  }, [travelers, ages, formattedAges, payloadOrder?.edades])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (payloadOrder?.cantidadPax && !travelers) {
      setTravelers(payloadOrder.cantidadPax)
    }
  }, [payloadOrder])

  const handleAddTraveler = () => {
    if (travelers < 9) {
      setTravelers(travelers + 1)
      setAges([...ages, { id: ages.length + 1, age: '0' }])
    }
  }

  const handleRemoveTraveler = (idToRemove: number) => {
    if (travelers > 1) {
      setTravelers(prevTravelers => prevTravelers - 1)
      const updatedAges = ages
        .filter(age => age.id !== idToRemove)
        .map((age, index) => ({
          ...age,
          id: index + 1
        }))
      setAges(updatedAges)
    }
  }

  const handleAgeChange = (id: number, value: string) => {
    setAges(ages.map(age => (age.id === id ? { ...age, age: value } : age)))
  }

  return (
    <PopoverContent className="w-auto" align="start" side="bottom">
      <div className="flex flex-col max-h-[320px]">
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>{t('label-select-count-travelers')}</span>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleRemoveTraveler(ages[ages.length - 1].id)}
                  disabled={travelers <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="min-w-8 text-center">{travelers}</span>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleAddTraveler} disabled={travelers >= 9}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {ages.map(traveler => (
              <div key={traveler.id}>
                <Separator />
                <div className="flex items-center justify-between gap-4">
                  <span className="min-w-[100px]">
                    {t('label-input-age-travelers')} {traveler.id}
                  </span>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={traveler.age}
                      onChange={e => handleAgeChange(traveler.id, e.target.value)}
                      onKeyPress={e => {
                        if (!/^[0-9]$/.test(e.key)) {
                          e.preventDefault()
                        }
                      }}
                      className="w-16 my-0.5"
                      pattern="[0-9]*"
                      min="0"
                      max="120"
                    />
                    <span>{t('label-input-age-travelers-sufix')}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      style={{
                        opacity: (payloadOrder?.cantidadPax as number) > 1 ? 1 : 0,
                        pointerEvents: (payloadOrder?.cantidadPax as number) > 1 ? 'auto' : 'none'
                      }}
                      onClick={() => handleRemoveTraveler(traveler.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sticky bottom-0 pt-4 bg-white">
          <Button
            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full"
            onClick={() => {
              setIsOpen(false)
              onChange(`${formattedAges !== '0' ? formattedAges : ''}`)
            }}
          >
            {t('action-apply')}
          </Button>
        </div>
      </div>
    </PopoverContent>
  )
}
