import fetch from "auth/axios";
import { AuthServiceType, LoginType, RegisterType } from "./types/AuthServiceType";

let AuthService: AuthServiceType = {};
const _url = "auth";

AuthService.login = (data: LoginType) => {
  return fetch({
    url: `${_url}/login`,
    method: "post",
    data: data,
  });
};


AuthService.signUp = (data: RegisterType) => {
  return fetch({
    url: `${_url}/register`,
    method: "post",
    data: data,
  });
};

AuthService.user = () => {
  return fetch({
    url:`auth/user`,
    method: "get"
  });
};

export default AuthService;
