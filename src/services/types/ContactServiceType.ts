export interface ContactServiceType {
  createContact?: any;
  updateContact?: any;
  getContact?: any;
  bulkUpload?: any;
}

export interface CreateContactType {
  id: number
}
export interface CsvFormDataType {
  file: File;
}