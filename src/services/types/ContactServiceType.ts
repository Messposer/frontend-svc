export interface ContactServiceType {
  createContact?: any;
  updateContact?: any;
  getContact?: any;
  bulkUpload?: any;
  createContactGroup?: any;
  createUserContact?: any;
  createBroadCast?: any;
  updateBroadCast?: any;
  getBroadCast?: any;
  getContactsFromGroupId?: any;
}

export interface CreateContactType {
  id: number
}

export interface CreateUserContactType {
  groupId: number;
  contactIds: number[];
}

export interface CreateBroadCastType {
  name: string;
  note?: string;
}
export interface CsvFormDataType {
  file: File;
}