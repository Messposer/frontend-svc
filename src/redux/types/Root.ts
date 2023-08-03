import { AuthState, ChatState } from "./";

export interface RootState {
  auth: AuthState,
  chat: ChatState,
}