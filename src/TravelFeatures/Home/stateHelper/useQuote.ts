import { useState } from 'react'
import useData from '@/TravelCore/Hooks/useData.ts'
import { useNavigate } from 'react-router-dom'
import { useOrderManagement } from './useOrderManagement'
import type { dataOrder } from '@/TravelCore/Utils/interfaces/Order.ts'
import useMasters from '@/TravelCore/Hooks/useMasters.ts'
import type { ProductsData } from '@/TravelCore/Utils/interfaces/Products.ts'

export const useQuote = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { setData, data } = useData() || {}
  const { getOrder, isDataOrderValid } = useOrderManagement()
  const { products: productsLocalStorage } = useMasters() || {}
  const products = productsLocalStorage?.data as ProductsData

  const processQuote = async () => {
    setIsLoading(true)

    try {
      if (!products || !products.items || products.items.length === 0) {
        throw new Error('No hay productos disponibles')
      }

      if (!data?.payloadOrder) {
        throw new Error('No existe payload de orden')
      }

      const payloadCompleto = { ...data.payloadOrder }
      const salida = payloadCompleto.salida ? new Date(payloadCompleto.salida.split('/').reverse().join('-')) : null
      const llegada = payloadCompleto.llegada ? new Date(payloadCompleto.llegada.split('/').reverse().join('-')) : null

      if (!salida || !llegada) {
        throw new Error('Fechas de salida o llegada inválidas')
      }

      const daysDifference = Math.floor((llegada.getTime() - salida.getTime()) / (1000 * 60 * 60 * 24))

      const asistenciaProducts = products.items.filter(p => p.tipo === 'Asistencia')
      if (asistenciaProducts.length === 0) {
        throw new Error('No hay productos de asistencia disponibles')
      }

      const numerosPreguntas: number[] = []

      for (const product of asistenciaProducts) {
        if (!product.tiempoMinimo || !product.tiempoMaximo || !product.idPregunta) {
          console.warn('Producto con datos incompletos:', product)
          continue
        }

        const minDays = Number.parseInt(product.tiempoMinimo)
        const maxDays = Number.parseInt(product.tiempoMaximo)
        const preguntaId = product.idPregunta

        if (Number.isNaN(minDays) || Number.isNaN(maxDays)) {
          console.warn('Tiempo mínimo o máximo inválido:', product)
          continue
        }

        if (daysDifference >= minDays && daysDifference <= maxDays) {
          numerosPreguntas.push(preguntaId)
        }
      }

      if (numerosPreguntas.length === 0) {
        throw new Error(`No hay números de pregunta válidos para estas fechas (${daysDifference} días)`)
      }

      payloadCompleto.numerosPreguntas = numerosPreguntas
      payloadCompleto.numeroPregunta = numerosPreguntas[0]

      setData?.(prevData => ({
        ...prevData,
        payloadOrder: {
          ...prevData?.payloadOrder,
          numeroPregunta: payloadCompleto.numeroPregunta
        }
      }))

      if (!isDataOrderValid(payloadCompleto as dataOrder)) {
        throw new Error('Datos de orden inválidos')
      }

      const resp = await getOrder(payloadCompleto as dataOrder)
      if (resp && Number(resp) > 0) {
        navigate('/quote/travel')
        setTimeout(() => {
          //navigate('/quote/travel')
          setIsLoading(false)
        }, 1000)
      } else {
        navigate('/quote/travel')
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
        throw new Error('Respuesta inválida del servidor')
      }
    } catch (error) {
      navigate('/quote/travel')
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      console.error('Error processing quote:', error)
    }
  }

  return { processQuote, isLoading }
}
