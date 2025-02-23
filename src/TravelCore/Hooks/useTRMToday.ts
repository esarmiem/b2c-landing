import useData from '@/TravelCore/Hooks/useData.ts'
import axios from 'axios'
import dayjs from 'dayjs'

export function useTRMToday() {
  const { data, setData } = useData() || {}

  const fetchTRM = async (): Promise<number> => {
    const today = dayjs().format('YYYY-MM-DD')
    const url = `https://www.datos.gov.co/resource/32sa-8pi3.json?vigenciadesde=${today}&$limit=1`

    try {
      const response = await axios.get(url)
      const [res] = response.data

      if (res) {
        const valor = Number.parseFloat(res.valor)
        if (setData) {
          setData({ ...data, TRM: valor })
        }
        return valor
      }

      throw new Error('Empty response')
    } catch (error) {
      console.error('Error fetching TRM:', error)
      const storedTRM = data?.TRM
      if (storedTRM) {
        return storedTRM
      }

      try {
        const fallbackResponse = await axios.get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')
        const valor = Number.parseFloat(fallbackResponse.data.usd.cop)
        if (setData) {
          setData({ ...data, TRM: valor })
        }
        return valor
      } catch (fallbackError) {
        console.error('Error fetching fallback TRM:', fallbackError)
        throw new Error('No TRM available')
      }
    }
  }

  return { fetchTRM }
}
