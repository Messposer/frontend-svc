export interface AuthServiceType {
  login?: any
  signUp?: any
  user?: any
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