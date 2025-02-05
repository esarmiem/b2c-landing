import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BASE_URL } from "./constants.ts";

interface Session {
    token?: string
    role?: any
    user_id?: number
}

interface AxiosHttpArgs {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    path?: string
    pathISL?: string
    session?: Session | null
    headers?: Record<string, string>
    data?: any
    timeout?: number
    customConfig?: AxiosRequestConfig
}

const getDefaultHeaders = (session?: Session): Record<string, string> => {
    const defaultHeaders: Record<string, string> = {};

    if (session && session.token) {
        defaultHeaders.Authorization = 'Bearer ' + session.token;
        //defaultHeaders.apiKey = API_KEY;
    }

    defaultHeaders['Accept'] = 'application/json';
    //defaultHeaders['apiKey'] = API_KEY;
    defaultHeaders['Content-Type'] = 'application/json';
    defaultHeaders['Access-Control-Allow-Origin'] = '*';
    return defaultHeaders;
}

export const axiosHttp = async (args: AxiosHttpArgs): Promise<{ data: any; error: string | null }> => {
    const url = args.pathISL ? args.pathISL : `${BASE_URL}/${args.path}`;
    const headers = args.session ? { ...getDefaultHeaders(args.session), ...args.headers } : args.headers;
    console.log("path ISL: ", args.pathISL)

    const config: AxiosRequestConfig = {
        method: args.method,
        url: url,
        // url: `${BASE_URL}/${args.path}`,
        //headers: args.session ? { ...getDefaultHeaders(args.session), ...args.headers } : args.headers,
        headers: headers,
        data: args.data,
        timeout: args.timeout || 60000,
    };
    try {
        const response: AxiosResponse = await axios({ ...config, ...args.customConfig });
        return { data: response.data, error: null };
    } catch (error: any) {
        return { data: null, error: error?.response?.data?.message || 'Unknown error' };
    }
};