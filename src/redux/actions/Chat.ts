import { ChatType } from 'redux/types/Chat';
import { CHAT_ACTION_TYPES } from '../constants/Chat';
import { CreateChatType } from 'services/types/ChatServiceType';

export const saveUserChats = (payload: ChatType[]) => {
  return {
    type: CHAT_ACTION_TYPES.SAVE_ALL_USER_CHAT,
    payload,
  };
};

export const saveUserSingleChat = (payload: ChatType) => {
  return {
    type: CHAT_ACTION_TYPES.SAVE_SINGLE_CHAT,
    payload,
  };
};

export const saveFirstChat = (payload: CreateChatType) => {
  return {
    type: CHAT_ACTION_TYPES.CREATE_FIRST_CHAT,
    payload,
  }
}
