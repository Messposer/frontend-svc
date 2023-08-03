export interface ChatServiceType {
  createChat?: any;
  createMessage?: any;
  sendAudio?: any;
}

export interface CreateChatType {
  contact_id: number;
  message: string;
};

export interface CreateMessageType {
  contact_id: number;
  text: string;
  chat_id: number;
  transporter: string;
  subject?: string;
};

export interface SendAudioType {
  audio: Blob;
  type: string;
}
