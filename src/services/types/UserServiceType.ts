export interface UserServiceType {
  getUserChats?: any;
  getUserSingleChat?: any;
  getUserContacts?: any;
  deleteUserContact?: any;
  getUserChatSummary?: any;
  getUserContactGroups?: any;
  getUserContactsInGroup?: any;
  deleteUserContactGroup?: any;
  getUserSchedules?: any;
}

export interface GetUserSingleChatType {
  id: number
}
