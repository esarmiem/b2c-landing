import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { BASE_URL } from "./constants.ts";

interface Session {
    isAuthenticated?: boolean;
}

interface AxiosHttpArgs {
    method: Method
    path: string
    session?: Session | null
    headers?: Record<string, string>
    data?: any
    timeout?: number
    customConfig?: AxiosRequestConfig
}

const getDefaultHeaders = (session?: Session): Record<string, string> => {
    const defaultHeaders: Record<string, string> = {};

    if (session && session.isAuthenticated) {
        defaultHeaders.Authorization = 'Bearer ' + window.localStorage.getItem('token');
        //defaultHeaders.apiKey = API_KEY;
    }

    //defaultHeaders['apiKey'] = API_KEY;
    defaultHeaders['Content-Type'] = 'application/json';

    return defaultHeaders;
}

const getHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = {};

    headers.Authorization = 'Bearer ' + window.localStorage.getItem('token');

    return headers;
}

export const axiosHttp = async (args: AxiosHttpArgs): Promise<{ data: any; error: string | null }> => {
    const config: AxiosRequestConfig = {
        method: args.method,
        url: `${BASE_URL}${args.path}`,
        headers: args.session ? { ...getDefaultHeaders(args.session), ...args.headers } : getHeaders(),
        data: args.data,
        timeout: args.timeout || 60000
    };
        console.log("header: ", config.headers);
    try {
        const response: AxiosResponse = await axios({ ...config, ...args.customConfig });
        return { data: response.data, error: null };
    } catch (error: any) {
        return { data: null, error: error?.response?.data?.message || 'Unknown error' };
    }
};