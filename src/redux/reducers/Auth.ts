import { AuthAction, AuthState } from '../types/Auth';
import {
  AUTH_ACTION_TYPES
} from "../constants/Auth";

const initState = {
  authUser: null,
  showMessage: false,
  redirect: "/dashboard",
  token: localStorage.getItem(AUTH_ACTION_TYPES.AUTH_TOKEN),
  refresh_token: localStorage.getItem(AUTH_ACTION_TYPES.REFRESH_TOKEN)
};

const auth = (state: AuthState = initState, action: AuthAction) => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.AUTHENTICATED:
      return {
        ...state,
        loading: false,
        redirect: "/dashboard",
        token: action?.payload?.token?.accessToken,
        refresh_token: action?.payload?.token?.refreshToken,
        authUser: action?.payload?.user
      };
    case AUTH_ACTION_TYPES.SIGN_OUT: {
      localStorage.removeItem(AUTH_ACTION_TYPES.AUTH_TOKEN);
      sessionStorage.removeItem(AUTH_ACTION_TYPES.AUTH_TOKEN);
      localStorage.removeItem(AUTH_ACTION_TYPES.REFRESH_TOKEN);
      localStorage.removeItem(AUTH_ACTION_TYPES.REDIRECT_PATH);
      return {
        ...state,
        token: null,
        authUser: null,
        redirect: "/",
      };
    }
    case AUTH_ACTION_TYPES.SET_USER_DATA: {
      return {
        ...state,
        authUser: action.payload,
      };
    }
    default:
      return state;
  }
};

export default auth;
