export interface SettingsServiceType {
  addNewSenderEmail?: any;
  getUserSenderEmails?: any;
  deleteUserSenderEmail?: any;
  resendConfirmationCode: any;
  verifyUserSenderEmail?: any;
  getUserActiveSenderEmail?: any;
}

export interface AddNewSenderEmailType {
  email: string;
  senderName: string;
  dns: string;
}

export interface VerifySenderEmailDataType {
  code: number;
}

export interface SenderEmailDataType { 
  id: number;
  status: string;
  email: string;
  senderName: string;
  dns: string;
  created_at?: string;
  updated_at?: string | null;
  deleted_at?: string | null;
}