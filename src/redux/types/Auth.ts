import { AUTH_ACTION_TYPES } from '../constants/Auth';

interface AUTH {
  type: AUTH_ACTION_TYPES.AUTHENTICATED
  payload: any
}
interface SIGN_OUT {
  type: AUTH_ACTION_TYPES.SIGN_OUT
  payload: any
}
interface SET_USER {
  type: AUTH_ACTION_TYPES.SET_USER_DATA
  payload: any
}
interface SET_RESET_CODE {
  type: AUTH_ACTION_TYPES.SET_RESET_CODE
  payload: RESET_CODE_TYPE
}

interface SET_CURRENT_EMAIL {
  type: AUTH_ACTION_TYPES.SET_CURRENT_EMAIL
  payload: CURRENT_EMAIL_TYPE
}
interface AUTH_STATE {
  authUser: User | null,
  showMessage: boolean,
  redirect: string | null,
  token: string | null,
  refresh_token: string | null,
  currentEmail: string | null,
  resetCode: RESET_CODE_TYPE | null,
}

interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  lastLoginAt: string;
  subscription_expire: string | null;
  credit: number;
}
export interface RESET_CODE_TYPE {
  id: number;
  code: number;
  created_at: string;
  expired_at: string;
}
export interface CURRENT_EMAIL_TYPE { 
  email: string;
}

export interface AuthData {
  token: Token;
  user: User;
}


export type AuthAction = AUTH | SIGN_OUT | SET_USER | SET_RESET_CODE | SET_CURRENT_EMAIL;
export type AuthState = AUTH_STATE;