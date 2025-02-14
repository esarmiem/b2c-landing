import {ISL_USER_NAME, ISL_PASSWORD, ISL_LOGIN} from '@/TravelCore/Utils/constants.ts';
import {axiosHttp} from '@/TravelCore/Utils/http.ts';

interface ISLAuthData {
  status: string;
  result: {
    token: string;
  };
}

interface ApiResponse {
  data: ISLAuthData
  error: string | null
}

export const AUTH_ISL_API = {
  loginISL: (): Promise<ApiResponse> => {
    const authData = {usuario: ISL_USER_NAME, password: ISL_PASSWORD};
    return axiosHttp({
      pathISL: ISL_LOGIN,
      method: 'POST',
      data: authData,
      session: null
    });
    }
}