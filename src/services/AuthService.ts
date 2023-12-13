import fetch from "auth/axios";
import { AuthServiceType, ChangePasswordType, ForgotPasswordType, LoginType, RegisterType, ResetPasswordType, VerifyCodeType } from "./types/AuthServiceType";

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

AuthService.forgot = (data: ForgotPasswordType) => {
  return fetch({
    url: `${_url}/forgot`,
    method: "post",
    data: data,
  });
};

AuthService.changePassword = (data: ChangePasswordType) => {
  return fetch({
    url: `${_url}/change`,
    method: "post",
    data: data,
  });
};

AuthService.verify = (data: VerifyCodeType) => {
  return fetch({
    url: `${_url}/verify`,
    method: "post",
    data: data,
  });
};

AuthService.reset = (data: ResetPasswordType) => {
  return fetch({
    url: `${_url}/reset`,
    method: "post",
    data: data,
  });
};

AuthService.user = () => {
  return fetch({
    url:`user`,
    method: "get"
  });
};

export default AuthService;
