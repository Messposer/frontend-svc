import { CHAT_ACTION_TYPES } from "redux/constants/Chat";
import { ChatAction, ChatState } from 'redux/types/Chat';

const initState = {
  userChats: [],
  singleChat: null,
  newChat: null,
};

const chat = (state: ChatState = initState, action: ChatAction) => {
  switch (action.type) {
    case CHAT_ACTION_TYPES.SAVE_ALL_USER_CHAT:
      return {
        ...state,
        userChats: action?.payload
      };
    case CHAT_ACTION_TYPES.SAVE_SINGLE_CHAT:
      return {
        ...state,
        singleChat: action?.payload
      };
    case CHAT_ACTION_TYPES.CREATE_FIRST_CHAT:
      return {
        ...state,
        newChat: action?.payload
      };
    default:
      return state;
  }
};

export default chat;
