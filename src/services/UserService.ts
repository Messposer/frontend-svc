import fetch from "auth/axios";
import { GetUserSingleChatType, UserServiceType } from "./types/UserServiceType";

let UserService: UserServiceType = {};
const _url = "user";

UserService.getUserChats = async ():Promise<any> => {
  const response = await fetch({
    url: `${_url}/chats`,
    method: "get"
  });
  return response;
};

UserService.getUserChatSummary = async ():Promise<any> => {
  const response = await fetch({
    url: `${_url}/chat-summary`,
    method: "get"
  });
  return response;
};

UserService.getUserContacts = async ():Promise<any> => {
  const response = await fetch({
    url: `${_url}/contacts`,
    method: "get"
  });
  return response;
};


UserService.deleteUserContact = async ({ id }: GetUserSingleChatType):Promise<any> => {
  const response = await fetch({
    url: `${_url}/contacts/${id}`,
    method: "delete"
  });
  return response;
};


UserService.getUserSingleChat = async ({ id }: GetUserSingleChatType) :Promise<any> => {
  const response = await fetch({
    url: `${_url}/chats/${id}`,
    method: "get"
  });
  return response;
};

export default UserService;
