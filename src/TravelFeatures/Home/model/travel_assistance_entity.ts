import {ASSISTANCE_API} from '../../../TravelCore/Services/Apis/Assistance'

interface AssistanceResponse {
    idProspecto: number
    planes: object
}

interface AssistanceRequest {
    pais: string
    destino: number
    numeroPregunta: number
    salida: string
    llegada: string
    cantidadPax: number
    edades: string
    telefono: string
    email: string
    lenguaje: string
    idUser: string
}

export class TravelAssistance{
    async getOrderPriceByAge(data: AssistanceRequest): Promise<AssistanceResponse> {
        return await ASSISTANCE_API.getOrderPriceByAge({data})
    }
}
