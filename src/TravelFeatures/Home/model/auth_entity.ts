import {MastersServices} from "../../../TravelCore/Services/Apis/Masters"

export class Auth{
    async login(): Promise<any> {
        return await MastersServices.authApi.login()
    }
}
