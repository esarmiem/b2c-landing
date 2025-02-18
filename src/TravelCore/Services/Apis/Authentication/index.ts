import { axiosHttp } from "../../../Utils/http.ts";
import {
  SERVICE_AUTHENTICATION,
  USER_NAME,
  PASSWORD,
} from "../../../Utils/constants.ts";

interface Permissions {
  idPermission: number;
  name: string;
  description: string;
  estaActivo: boolean;
}

interface PermissionsRoles {
  idPermissionRole: number;
  idPermission: number;
  idRole: number;
  permission: Permissions;
}

interface Roles {
  idRole: number;
  name: string;
  description: string;
  estaActivo: boolean;
  permissionsRoles: PermissionsRoles[];
}

interface Users {
  idUser: number;
  firstName: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  documentNumber: string;
  email: string;
  phone: string;
  userName: string;
  isActive: boolean;
  remember_token: string | null;
  idRole: number;
  idAgencia: number | null;
  role: Roles;
  agencia: string | null;
}

export interface AuthData {
  user: Users;
  payload: {
    accessToken: string;
    refreshToken: string;
  };
}

interface ApiResponse {
  data: AuthData;
  error: string | null;
}

export const AUTH_API = {
  login: (): Promise<ApiResponse> => {
    const loginData = { username: USER_NAME, password: PASSWORD };
    return axiosHttp({
      path: `${SERVICE_AUTHENTICATION}`,
      method: "POST",
      data: loginData,
      session: null,
    });
  },
};
