import fetch from "auth/axios";
import { AxiosResponse } from "axios";
import { ChatServiceType, CreateChatType, CreateMessageType, SendAudioType } from "./types/ChatServiceType";

let ChatService: ChatServiceType = {};
const _url = "chat";

ChatService.createChat = async (data: CreateChatType):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/start-conversation`,
    method: "post",
    data
  });
  return response;
};

ChatService.sendAudio = async (data: SendAudioType):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/send-audio`,
    method: "post",
    data
  });
  return response;
};

ChatService.createMessage = async (data: CreateMessageType):Promise<AxiosResponse> => {
  const response = await fetch({
    url: 'message',
    method: "post",
    data
  });
  return response;
};

export default ChatService;
