import { axiosHttp } from "../../../Utils/http.ts"
import { SERVICE_AUTHENTICATION } from "../../../Utils/constants.ts"

interface LoginData {
    username: string
    password: string
}

interface ApiResponse {
    data: any
    error: string | null
}

export const AUTH_API = {
    login: (data: LoginData): Promise<ApiResponse> => {
        return axiosHttp({
            path: `${SERVICE_AUTHENTICATION}`,
            method: 'POST',
            data: JSON.stringify(data),
            session: null
        })
    },
}