import useData from '@/TravelCore/Hooks/useData.ts'
import type { dataOrder, Plan } from '@/TravelCore/Utils/interfaces/Order.ts'
import { TravelAssistance } from '@/TravelFeatures/Home/model/travel_assistance_entity.ts'

export const useOrderManagement = () => {
  const { setData, data } = useData() || {}

  const isDataOrderValid = (order: dataOrder): boolean => {
    const requiredProps = [
      'pais',
      'cantidadPax',
      'edades',
      'destino',
      'idUser',
      'lenguaje',
      'llegada',
      'salida',
      'telefono',
      'email',
      'numeroPregunta'
    ]

    for (const prop of requiredProps) {
      if (!(prop in order)) {
        console.log(`Falta la propiedad requerida: ${prop}`)
        return false
      }

      const value = order[prop as keyof dataOrder]

      if (value === null || value === undefined) {
        console.log(`Propiedad inválida - ${prop}: null o undefined`)
        return false
      }

      if (typeof value === 'string' && value.trim() === '') {
        console.log(`Propiedad inválida - ${prop}: cadena vacía`)
        return false
      }
    }

    return true
  }

  const getOrder = async (orderPayload: dataOrder): Promise<string | null> => {
    const travelAssistance = new TravelAssistance()
    try {
      const numerosPreguntas = orderPayload.numerosPreguntas || []

      if (numerosPreguntas.length === 0) return null

      const combinedData = {
        planes: [] as Plan[],
        idProspecto: 0
      }

      const fetchPlanesByNumeroPregunta = async (numeroPregunta: number) => {
        let attempts = numeroPregunta === numerosPreguntas[0] ? 2 : 1
        let delay = 1000

        while (attempts > 0) {
          try {
            if (attempts < 2 && numeroPregunta === numerosPreguntas[0]) {
              await new Promise(resolve => setTimeout(resolve, delay))
              delay *= 2
            }

            const response = await travelAssistance.getOrderPriceByAge({
              ...orderPayload,
              numeroPregunta
            })

            if (response?.data?.planes && response.data.planes.length > 0) {
              return {
                success: true,
                data: response.data
              }
            }

            return { success: false, data: null }
          } catch (requestError) {
            console.error(`Error en solicitud para numeroPregunta=${numeroPregunta}, intento ${4 - attempts}:`, requestError)
            attempts--

            if (attempts === 0) {
              console.log(`Todos los intentos fallaron para numeroPregunta=${numeroPregunta}`)
              return { success: false, data: null }
            }
          }
        }

        return { success: false, data: null }
      }

      const results = await Promise.all(numerosPreguntas.map(numeroPregunta => fetchPlanesByNumeroPregunta(numeroPregunta)))
      // Procesar todos los resultados exitosos
      for (const result of results) {
        if (result.success && result.data) {
          if (!combinedData.idProspecto && result.data.idProspecto) {
            combinedData.idProspecto = result.data.idProspecto
          }
          const existingPlaneIds = new Set(combinedData.planes.map(p => p.IdPlan))
          const newPlanes = result.data.planes.filter(p => !existingPlaneIds.has(p.IdPlan))
          combinedData.planes.push(...newPlanes)
        }
      }

      if (combinedData.planes.length > 0 && combinedData.idProspecto) {
        setData?.(prevData => ({
          ...prevData,
          responseOrder: combinedData
        }))
        return String(combinedData.idProspecto)
      }
      return null
    } catch (error) {
      console.error('Error al obtener los planes:', error)
      return null
    }
  }

  return { getOrder, isDataOrderValid, data }
}
