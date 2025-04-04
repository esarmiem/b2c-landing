import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Check } from 'lucide-react'

interface StepProps {
  number: number
  text: string
  isActive?: boolean
  isCompleted?: boolean
  showDivider?: boolean
}

const Step = ({ number, text, isActive = false, isCompleted = false, showDivider = false }: StepProps) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <div
          className={`${
            isActive ? 'bg-red-600 text-white' : isCompleted ? 'bg-green-600 text-white' : 'border-2 border-gray-300 text-gray-500'
          } rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs md:text-sm`}
        >
          {isCompleted ? <Check size={12} /> : number}
        </div>
        <span
          className={`ml-1 md:ml-2 ${
            isActive ? 'text-red-600 font-medium' : isCompleted ? 'text-green-600 font-medium' : 'text-gray-500'
          } text-xs md:text-base`}
        >
          {text}
        </span>
      </div>
      {showDivider && <div className="h-[2px] w-3 md:w-32 mx-1 md:mx-4 border-t-2 border-dashed border-gray-300" />}
    </div>
  )
}

export const Breadcrumb = () => {
  const { t } = useTranslation(['products'])
  const location = useLocation()

  // Determinamos qué step está activo según la ruta
  const currentPath = location.pathname

  // Definimos paso activo y completados basados en la ruta actual
  const isStep1Active = currentPath === '/quote/travel'
  const isStep2Active = currentPath === '/traveler'
  const isStep3Active = currentPath === '/invoice'

  // Determinamos cuáles pasos están completados
  // Un paso está completado si estamos en un paso posterior
  const isStep1Completed = !isStep1Active && (isStep2Active || isStep3Active)
  const isStep2Completed = !isStep2Active && isStep3Active
  const isStep3Completed = false // El último paso nunca está "completado"

  return (
    <div className="w-full bg-gray-50">
      <div className="max-w-5xl mx-auto py-4 md:py-9">
        <div className="flex items-center justify-center gap-1 md:gap-4 flex-nowrap">
          <Step number={1} text={t('label-step-1')} isActive={isStep1Active} isCompleted={isStep1Completed} showDivider={true} />
          <Step number={2} text={t('label-step-2')} isActive={isStep2Active} isCompleted={isStep2Completed} showDivider={true} />
          <Step number={3} text={t('label-step-3')} isActive={isStep3Active} isCompleted={isStep3Completed} />
        </div>
      </div>
    </div>
  )
}
