import { axiosHttp } from '../../../Utils/http.ts'
import { SERVICE_AUTHENTICATION, USER_NAME, PASSWORD } from '../../../Utils/constants.ts'

/**
 * Permissions
 *
 * Spanish:
 * Define la estructura de un permiso, incluyendo su identificador, nombre, descripción y estado activo.
 *
 * English:
 * Defines the structure of a permission, including its identifier, name, description, and active status.
 */
interface Permissions {
  idPermission: number
  name: string
  description: string
  estaActivo: boolean
}

/**
 * PermissionsRoles
 *
 * Spanish:
 * Define la relación entre permisos y roles, incluyendo los identificadores correspondientes y el objeto de permiso.
 *
 * English:
 * Defines the relationship between permissions and roles, including the respective identifiers and the permission object.
 */
interface PermissionsRoles {
  idPermissionRole: number
  idPermission: number
  idRole: number
  permission: Permissions
}

/**
 * Roles
 *
 * Spanish:
 * Define la estructura de un rol, que incluye información básica y una lista de relaciones con permisos.
 *
 * English:
 * Defines the structure of a role, which includes basic information and a list of relationships with permissions.
 */
interface Roles {
  idRole: number
  name: string
  description: string
  estaActivo: boolean
  permissionsRoles: PermissionsRoles[]
}

/**
 * Users
 *
 * Spanish:
 * Define la estructura de un usuario, incluyendo información personal, credenciales, estado y asociaciones con rol y agencia.
 *
 * English:
 * Defines the structure of a user, including personal information, credentials, status, and associations with a role and agency.
 */
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

/**
 * AuthData
 *
 * Spanish:
 * Define la estructura de los datos de autenticación, que incluyen el usuario y un payload con tokens de acceso y refresco.
 *
 * English:
 * Defines the structure of authentication data, which includes the user and a payload containing access and refresh tokens.
 */
export interface AuthData {
  user: Users
  payload: {
    accessToken: string
    refreshToken: string
  }
}

/**
 * ApiResponse
 *
 * Spanish:
 * Define la estructura de la respuesta de la API, que incluye los datos de autenticación y, opcionalmente, un mensaje de error.
 *
 * English:
 * Defines the structure of the API response, which includes the authentication data and, optionally, an error message.
 */
interface ApiResponse {
  data: AuthData
  error: string | null
}

/**
 * AUTH_API
 *
 * Spanish:
 * Objeto que encapsula las funciones relacionadas con la autenticación de la API.
 * En este caso, se define la función `login` para autenticar al usuario utilizando las credenciales establecidas.
 *
 * English:
 * Object that encapsulates functions related to API authentication.
 * In this case, it defines the `login` function to authenticate the user using the established credentials.
 */
export const AUTH_API = {
  /**
   * login
   *
   * Spanish:
   * Realiza una petición POST para autenticar al usuario utilizando las credenciales definidas en las constantes.
   *
   * English:
   * Performs a POST request to authenticate the user using the credentials defined in the constants.
   *
   * @returns {Promise<ApiResponse>} Una promesa que se resuelve con la respuesta de la API.
   *                                 / A promise that resolves with the API response.
   */
  login: (): Promise<ApiResponse> => {
    const loginData = { username: USER_NAME, password: PASSWORD }
    return axiosHttp({
      pathISL: `${SERVICE_AUTHENTICATION}`,
      method: 'POST',
      data: loginData,
      session: null
    })
  }
}
