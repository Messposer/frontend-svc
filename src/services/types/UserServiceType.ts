export interface UserServiceType {
  getUserChats?: any;
  getUserSingleChat?: any;
  getUserContacts?: any;
  deleteUserContact?: any;
  getUserChatSummary?: any;
}

export interface GetUserSingleChatType {
  id: number
}
