import {AUTH_API} from "@/TravelCore/Services/Apis/Authentication";

export class Auth{
    async login(): Promise<any> {
        return await AUTH_API.login();
    }
}