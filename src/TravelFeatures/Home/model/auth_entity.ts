import {AUTH_API} from '../../../TravelCore/Services/Apis/Authentication'

export class Auth{
    async login(): Promise<any> {
        return AUTH_API.login;
    }
}
