import useSession from '@/TravelCore/Hooks/useSession.ts'
import { Auth } from '@/TravelFeatures/Home/model/auth_entity.ts'

interface AuthResponse {
  data?: {
    payload: { accessToken: string }
    user: { role: string; idUser: string }
  }
  error?: boolean
}

export const useAuth = () => {
  const { setSession } = useSession() || {}

  const authenticate = async (): Promise<boolean> => {
    try {
      const auth = new Auth()
      const response: AuthResponse = await auth.login()

      if (response?.data && !response.error) {
        const sessionData = {
          token: response.data.payload.accessToken,
          role: JSON.stringify(response.data.user.role),
          user_id: response.data.user.idUser
        }
        setSession?.(sessionData)
        sessionStorage.setItem('token', response.data.payload.accessToken)
        return true
      }
    } catch (error) {
      console.error('Error durante la autenticación:', error)
    }
    return false
  }

  return { authenticate }
}
