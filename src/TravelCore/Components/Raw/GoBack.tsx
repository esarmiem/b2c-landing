import { CornerUpLeft } from 'lucide-react'
import useData from '@/TravelCore/Hooks/useData'

interface GoBackProps {
  title: string
  url: string
}

export function GoBack({ title, url }: GoBackProps) {
  const { setData } = useData() || {}

  const setIsReset = () => {
    setData?.(prevData => ({
      ...prevData,
      isReset: true
    }))
  }

  return (
    <button
      type="button"
      className="flex text-sm text-grey-600 items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-100"
      onClick={() => {
        setIsReset()
        window.location.href = url
      }}
    >
      <CornerUpLeft className="w-4 h-4" />
      {title}
    </button>
  )
}
