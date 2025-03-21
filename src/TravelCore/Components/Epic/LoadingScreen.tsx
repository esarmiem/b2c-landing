import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import LoadingGif from '../../../../Assets/loadinganimation.gif'

interface LoadingScreenProps {
  message?: string
  subMessage?: string
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ message, subMessage }) => {
  const [randomNumber, setRandomNumber] = useState<number>(0)

  useEffect(() => {
    // Generar un número aleatorio entre 65 y 235
    const randomNum = Math.floor(Math.random() * (235 - 65 + 1)) + 65
    setRandomNumber(randomNum)
  }, [])

  // Dividir "TRAVELKIT" en letras individuales
  const brandName = "TRAVELKIT".split("");

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-0">
      <div className="flex flex-col items-center max-w-md text-center p-4">
        <img src={LoadingGif} alt="Loading" className="mb-8 w-[400px] h-[400px]" />
        <div className="flex items-center">
          <div className="flex items-baseline">
            {brandName.map((letter, index) => (
              <span 
                key={index} 
                className="font-extrabold text-4xl md:text-6xl text-red-600 hover:text-red-600 inline-block animate-subtleBounce"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 text-lg md:text-xl font-medium text-gray-700 mb-4">
          <Loader2 className="h-5 w-5 animate-spin text-red-600" />
          <span>{message}</span>
        </div>
        <p className="text-md text-gray-500">{subMessage?.replace('165', randomNumber.toString())}</p>
      </div>
    </div>
  )
}