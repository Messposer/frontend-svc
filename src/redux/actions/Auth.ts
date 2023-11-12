import { LoginType } from "services/types/AuthServiceType";
import {
  AUTH_ACTION_TYPES
} from "../constants/Auth";
import { CURRENT_EMAIL_TYPE, RESET_CODE_TYPE } from "redux/types";

export const signIn = (payload: LoginType) => {
  return {
    type: AUTH_ACTION_TYPES.SIGN_IN,
    payload,
  };
};

export const authenticated = (payload: any) => {
  return {
    type: AUTH_ACTION_TYPES.AUTHENTICATED,
    payload,
  };
};

export const signOut = () => {
  return {
    type: AUTH_ACTION_TYPES.SIGN_OUT,
  };
};

export const saveUserData = (payload: any) => {
  return {
    type: AUTH_ACTION_TYPES.SET_USER_DATA,
    payload,
  };
};

export const saveCurrentEmail = (payload: string) => {
  sessionStorage.setItem(AUTH_ACTION_TYPES.SET_CURRENT_EMAIL, payload);
  return {
    type: AUTH_ACTION_TYPES.SET_CURRENT_EMAIL,
    payload,
  };
};

export const saveResetCode = (payload: RESET_CODE_TYPE) => {
  return {
    type: AUTH_ACTION_TYPES.SET_RESET_CODE,
    payload,
  };
};
