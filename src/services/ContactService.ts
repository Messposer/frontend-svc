import fetch from "auth/axios";
import { 
  ContactServiceType,
  CreateBroadCastType, 
  CreateContactType, 
  CreateUserContactType, 
  CsvFormDataType 
} from "./types/ContactServiceType";
import { AxiosResponse } from "axios";

let ContactService: ContactServiceType = {};
const _url = "contact";
const _url_broadcast = "contact-group";
const _url_user_broadcast = "user-contact-group";

ContactService.createContact = async (data: CreateContactType):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}`,
    method: "post",
    data
  });
  return response;
};

ContactService.createBroadCast = async (data: CreateBroadCastType):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url_broadcast}`,
    method: "post",
    data
  });
  return response;
};

ContactService.bulkUpload = async (data: CsvFormDataType):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/bulk`,
    method: "post",
    data
  });
  return response;
};

ContactService.createUserContact = async (data: CreateUserContactType):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url_user_broadcast}`,
    method: "post",
    data
  });
  return response;
};

ContactService.updateContact = async (data: CreateContactType, id: number):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/${id}`,
    method: "put",
    data
  });
  return response;
};

ContactService.updateBroadCast = async (data: CreateBroadCastType, id: number):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url_broadcast}/${id}`,
    method: "put",
    data
  });
  return response;
};

ContactService.getContact = async (id: number):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/${id}`,
    method: "get",
  });
  return response;
};

ContactService.getBroadCast = async (id: number):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url_broadcast}/${id}`,
    method: "get",
  });
  return response;
};

ContactService.getContactsFromGroupId = async (id: number):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url_user_broadcast}/get-contacts/${id}`,
    method: "get",
  });
  return response;
};

export default ContactService;
