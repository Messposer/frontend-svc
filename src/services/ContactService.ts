import fetch from "auth/axios";
import { ContactServiceType, CreateContactType, CsvFormDataType } from "./types/ContactServiceType";
import { AxiosResponse } from "axios";

let ContactService: ContactServiceType = {};
const _url = "contact";

ContactService.createContact = async (data: CreateContactType):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}`,
    method: "post",
    data
  });
  return response;
};

ContactService.bulkUpload = async (data: CsvFormDataType):Promise<AxiosResponse> => {
  console.log("ok")
  const response = await fetch({
    url: `${_url}/bulk`,
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

ContactService.getContact = async (id: number):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/${id}`,
    method: "get",
  });
  return response;
};

export default ContactService;
