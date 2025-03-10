import useData from '@/TravelCore/Hooks/useData'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Info, Users } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NumberTravelers } from '@/TravelCore/Components/Raw/NumberTravelers.tsx'

interface TravelersPopoverProps {
  onChange: (value: string) => void
  errors?: string[]
}

export const TravelersPopover = ({ errors, onChange }: TravelersPopoverProps) => {
  const { t } = useTranslation(['home'])
  const { data } = useData() || {}
  const payloadOrder = data?.payloadOrder
  const travelers = payloadOrder?.cantidadPax || 1
  const [isOpen, setIsOpen] = useState(false)
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-between rounded-full overflow-hidden whitespace-nowrap flex-col h-auto items-start">
          <div className="hidden md:flex items-center gap-2">
            <span className={`text-sm text-muted-foreground ${errors && errors?.length > 0 ? 'text-red-500' : ''}`}>
              {errors && errors?.length > 0 ? errors[0] : t('placeholder-count-travelers')}
            </span>
            <TooltipProvider>
              <Tooltip open={activeTooltip === 'travelers'} onOpenChange={open => setActiveTooltip(open ? 'travelers' : null)}>
                <TooltipTrigger asChild>
                  <span onMouseEnter={() => setActiveTooltip('travelers')} onMouseLeave={() => setActiveTooltip(null)}>
                    <Info className={`h-4 w-4 text-muted-foreground cursor-help ${errors && errors?.length > 0 ? 'text-red-500' : ''}`} />
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-64">{t('tooltip-travelers')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <div className={`flex items-center gap-2 ${errors && errors?.length > 0 ? 'hidden sm:flex' : ''}`}>
              <Users className="h-4 w-4" />
              <span className="text-ellipsis overflow-hidden">
                {travelers} {travelers === 1 ? t('content-select-travelers') : `${t('content-select-travelers')}s`}{' '}
              </span>
            </div>
            <span
              className={`items-center gap-2 hidden text-ellipsis overflow-hidden ${errors && errors?.length > 0 ? 'text-red-500 flex sm:hidden' : ''}`}
            >
              <Info className={`h-4 w-4 text-muted-foreground cursor-help ${errors && errors?.length > 0 ? 'text-red-500' : ''}`} />
              {errors && errors?.length > 0 ? errors[0] : ''}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <NumberTravelers onChange={onChange} setIsOpen={setIsOpen} />
    </Popover>
  )
}
