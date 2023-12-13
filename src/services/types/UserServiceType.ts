export interface UserServiceType {
  getAllCategories?: any;
  getACategory?: any;
  UpdateACategory?: any;
  StoreACategory?: any;
  DeleteACategory?: any;
  getAllProducts?: any;
  getAProduct?: any;
  UpdateAProduct?: any;
  StoreAProduct?: any;
  DeleteAProduct?: any;
}

export interface GetUserSingleChatType {
  id: number
}

export interface SaveCategoryPayloadType {
  title: string,
  description: string,
}

export interface UpdateProductPayloadType {
  title: string,
  category_id: string,
  description: string,
}