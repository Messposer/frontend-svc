export interface AuthServiceType {
  login?: any;
  signUp?: any;
  user?: any;
  forgot?: any;
  verify?: any;
  reset?: any;
  changePassword?: any;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface RegisterType {
  username: string;
  email: string;
  password: string;
}

export interface ForgotPasswordType {
  email: string;
}

export interface VerifyCodeType {
  code: number;
}

export interface ResetPasswordType {
  password: string;
  code: number;
}

export interface ChangePasswordType {
  oldPassword: string;
  newPassword: string;
}