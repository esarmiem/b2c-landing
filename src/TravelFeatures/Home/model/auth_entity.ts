import {AUTHENTICATION_API} from '../../../TravelCore/Services/Apis/Authentication'

export class Auth{
    async login(): Promise<any> {
        return await AUTHENTICATION_API.login()
    }
}
