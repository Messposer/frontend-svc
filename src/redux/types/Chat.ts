import { CreateChatType } from 'services/types/ChatServiceType';
import { CHAT_ACTION_TYPES } from '../constants/Chat';

interface SAVE_USER_CHATS {
  type: CHAT_ACTION_TYPES.SAVE_ALL_USER_CHAT
  payload: ChatType[],
}

interface SAVE_USER_SINGLE_CHATS {
  type: CHAT_ACTION_TYPES.SAVE_SINGLE_CHAT
  payload: ChatType,
}

interface SAVE_FIRST_CHAT {
  type: CHAT_ACTION_TYPES.CREATE_FIRST_CHAT
  payload: CreateChatType,
}

interface CHAT_STATE {
  userChats: ChatType[],
  singleChat: ChatType | null,
  newChat: any,
}

export interface ContactType { 
  id: number;
  number: string;
  first_name: string;
  last_name: string;
  address: string | null;
  email: string;
  note: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface MessageType {
  id: number;
  text: string;
  status: number;
  transporter: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  contact: ContactType;
};


export interface ChatType {
  id: number;
  chat_gpt_id: string;
  chat_gpt_message: string;
  chat_gpt_response: {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
      index: number;
      message: {
        role: string;
        content: string;
      };
      finish_reason: string;
    }[];
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  };
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  message: MessageType
}


export type ChatAction = SAVE_USER_CHATS | SAVE_USER_SINGLE_CHATS | SAVE_FIRST_CHAT;
export type ChatState = CHAT_STATE;