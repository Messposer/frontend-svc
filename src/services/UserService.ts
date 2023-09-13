import fetch from "auth/axios";
import { GetUserSingleChatType, UserServiceType } from "./types/UserServiceType";
import { AxiosResponse } from "axios";

let UserService: UserServiceType = {};
const _url = "user";

UserService.getUserChats = async ():Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/chats`,
    method: "get"
  });
  return response;
};

UserService.getUserChatSummary = async ():Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/chat-summary`,
    method: "get"
  });
  return response;
};

UserService.getUserContacts = async ():Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/contacts`,
    method: "get"
  });
  return response;
};


UserService.deleteUserContact = async ({ id }: GetUserSingleChatType):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/contacts/${id}`,
    method: "delete"
  });
  return response;
};


UserService.getUserSingleChat = async ({ id }: GetUserSingleChatType) :Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/chats/${id}`,
    method: "get"
  });
  return response;
};

UserService.getUserContactGroups = async () :Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/contact-groups`,
    method: "get"
  });
  return response;
};

UserService.getUserContactsInGroup = async (id: number) :Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/contacts-in-group/${id}`,
    method: "get"
  });
  return response;
};

UserService.getUserSchedules = async () :Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/schedules`,
    method: "get"
  });
  return response;
};

UserService.deleteUserContactGroup = async ({ id }: GetUserSingleChatType):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/contact-groups/${id}`,
    method: "delete"
  });
  return response;
};
export default UserService;
