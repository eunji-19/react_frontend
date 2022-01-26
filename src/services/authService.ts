import axios from "axios";
import { APP_URL } from "../configure";
import { LoginReqType, SignupReqType } from "../types";

export default class AuthService {
  public static login(reqData: LoginReqType) {
    return axios.post(`${APP_URL}/auth/login`, reqData).then((response) => {
      if (response.data.statusMessage.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
  }

  public static signUp(reqData: SignupReqType) {
    return axios.post(`${APP_URL}/auth/signup`, reqData).then((response) => {
      return response.data;
    });
  }

  public static async logout(): Promise<void> {
    return await axios.get(`${APP_URL}/auth/logout`).then((response) => {
      localStorage.removeItem("user");
      return response.data;
    });
  }
}
