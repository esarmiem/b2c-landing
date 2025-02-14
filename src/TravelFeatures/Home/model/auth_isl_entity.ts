import {AUTH_ISL_API} from "@/TravelCore/Services/Apis/AuthenticationISL";

export class AuthISL{
  async loginISL(): Promise<any> {
    return await AUTH_ISL_API.loginISL();
  }
}