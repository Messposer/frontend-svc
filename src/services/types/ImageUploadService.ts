export interface ImageUploadServiceType {
  uploadMedia?: any;
  deleteMedia?: any;
  getUserMedia?: any;
  getAMedia?: any;
}

export interface MediaType {
  id: number;
  name: string;
  created_at: string | null;
  updated_at: string;
  deleted_at: string | null;
  type: string;
  url: string;
}
