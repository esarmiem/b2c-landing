import {MouseEvent} from 'react'
import {Button} from '@/components/ui/button'
import {useTranslation} from "react-i18next"
import {Search} from 'lucide-react'

interface TravelButtonFormProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

export const TravelButtonForm = ({onClick}: TravelButtonFormProps) => {
  const { t } = useTranslation(["home"])

  return (
      <Button
        className="relative overflow-hidden border border-red-600 bg-red-600 text-white shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-red-600 hover:before:w-2/4 hover:before:bg-black hover:after:w-2/4 hover:after:bg-black rounded-full lg:w-full h-auto px-4 py-2 flex items-center justify-center gap-2"
        onClick={onClick}
      >
        <span className="relative z-10 flex items-center gap-2">
        <Search />
        {t('label-button-search')}
        </span>
      </Button>
  )
}