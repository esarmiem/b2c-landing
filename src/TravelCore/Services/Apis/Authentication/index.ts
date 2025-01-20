import { axiosHttp } from "../../../Utils/http.ts"
import { SERVICE_AUTHENTICATION } from "../../../Utils/constants.ts"

interface Permissions {
    idPermission: number
    name: string
    description: string
    estaActivo: boolean
}

interface PermissionsRoles {
    idPermissionRole: number
    idPermission: number
    idRole: number
    permission: Permissions
}

interface Roles {
    idRole: number
    name: string
    description: string
    estaActivo: boolean
    permissionsRoles: PermissionsRoles[]
}

interface Users {
    idUser: number
    firstName: string
    secondName: string
    lastName: string
    secondLastName: string
    documentNumber: string
    email: string
    phone: string
    userName: string
    isActive: boolean
    remember_token: string | null
    idRole: number
    idAgencia: number | null
    role: Roles
    agencia: string | null
}

export interface AuthData {
    user: Users
    payload: {
        accessToken: string
        refreshToken: string
    }
}

interface ApiResponse {
    data: AuthData
    error: string | null
}

interface LoginData {
    username: string
    password: string
}

export const AUTH_API = {
    login: (data: LoginData): Promise<ApiResponse> => {
        return axiosHttp({
            path: `${SERVICE_AUTHENTICATION}`,
            method: 'POST',
            data: data,
            session: null
        })
    },
}