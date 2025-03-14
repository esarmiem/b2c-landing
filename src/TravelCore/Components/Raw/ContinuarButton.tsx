import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { MouseEvent } from 'react'

interface ContinuarButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

export function ContinuarButton({ onClick }: ContinuarButtonProps) {
  const { t } = useTranslation(['traveler'])

  return (
    <div className="w-full rounded-full">
      <Button onClick={onClick} className="w-full p-7 rounded-full border-2 border-black bg-white text-black hover:bg-gray-100">
        <span className="flex text-lg font-semibold items-center">
          {t('button-continue')}
          <ChevronRight className="w-4 h-4 ml-2" />
        </span>
      </Button>
    </div>
  )
}
