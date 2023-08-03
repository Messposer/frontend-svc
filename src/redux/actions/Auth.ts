import { LoginType } from "services/types/AuthServiceType";
import {
  AUTH_ACTION_TYPES
} from "../constants/Auth";

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
