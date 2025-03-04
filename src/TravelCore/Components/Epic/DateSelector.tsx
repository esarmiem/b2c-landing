import useData from '@/TravelCore/Hooks/useData.ts'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { format, parse } from 'date-fns'
import { CalendarIcon, Info } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { useTranslation } from 'react-i18next'

interface DateSelectorProps {
  activeTooltip: string | null
  setActiveTooltip: (tooltip: string | null) => void
  t: (key: string) => string
  onChange: (value: string) => void
  errors?: string[]
}

export function DateSelector({ activeTooltip, setActiveTooltip, t, errors, onChange }: DateSelectorProps) {
  const { data, setData } = useData() || {}
  const { i18n } = useTranslation()
  const payloadOrder = data?.payloadOrder
  const isValidDate = (dateString: string | undefined): boolean => {
    if (!dateString) return false
    const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date())
    return !Number.isNaN(parsedDate.getTime())
  }

  const initialDateRange: DateRange | undefined =
    isValidDate(payloadOrder?.salida) && isValidDate(payloadOrder?.llegada)
      ? {
          from: parse(payloadOrder?.salida ?? '', 'dd/MM/yyyy', new Date()),
          to: parse(payloadOrder?.llegada ?? '', 'dd/MM/yyyy', new Date())
        }
      : undefined

  const [date, setDate] = useState<DateRange | undefined>(initialDateRange)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (date?.from && date?.to && setData) {
      onChange(`${format(date.from, 'dd/MM/yyyy')} - ${format(date.to, 'dd/MM/yyyy')}`)
      setData(prevData => ({
        ...prevData,
        payloadOrder: {
          ...prevData?.payloadOrder,
          salida: date.from ? format(date.from, 'dd/MM/yyyy') : '',
          llegada: date.to ? format(date.to, 'dd/MM/yyyy') : '',
          lenguaje: i18n.language,
          telefono: '+000000000000',
          email: 'dummy@dummy.com'
        }
      }))
    }
  }, [date, i18n.language])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="justify-between text-left font-normal rounded-full overflow-hidden whitespace-nowrap flex-col h-auto items-start"
        >
          <div className="hidden md:flex items-center gap-2">
            <span className={`text-sm text-muted-foreground ${errors && errors?.length > 0 ? 'text-red-500' : ''}`}>
              {errors && errors?.length > 0 ? errors : t('placeholder-tooltip-dates')}
            </span>
            <TooltipProvider>
              <Tooltip open={activeTooltip === 'dates'} onOpenChange={open => setActiveTooltip(open ? 'dates' : null)}>
                <TooltipTrigger asChild>
                  <span onMouseEnter={() => setActiveTooltip('dates')} onMouseLeave={() => setActiveTooltip(null)}>
                    <Info className={`h-4 w-4 text-muted-foreground cursor-help ${errors && errors?.length > 0 ? 'text-red-500' : ''}`} />
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-64">{t('tooltip-dates')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <div className={`flex items-center gap-2 ${errors && errors?.length > 0 ? 'hidden sm:flex' : ''}`}>
              <CalendarIcon className="h-4 w-4" />
              <span className="text-ellipsis overflow-hidden">
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span>{t('label-between-dates')}</span>
                )}
              </span>
            </div>
            <span
              className={`items-center gap-2 hidden text-ellipsis overflow-hidden ${errors && errors?.length > 0 ? 'text-red-500 flex sm:hidden' : ''}`}
            >
              <Info className={`h - 4 w-4 text-muted-foreground cursor-help ${errors && errors?.length > 0 ? 'text-red-500' : ''}`} />
              {errors && errors?.length > 0 ? errors : ''}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
      </PopoverContent>
    </Popover>
  )
}
