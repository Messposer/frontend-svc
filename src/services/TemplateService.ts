import fetch from "auth/axios";
import { AxiosResponse } from "axios";
import { AddUserToTemplateType, TemplateServiceType } from "./types/TemplateServiceType";

let TemplateService: TemplateServiceType = {};
const _url = "user-template";
const t_url = "template";

TemplateService.getAllUserTemplates = async ():Promise<AxiosResponse> => {
  const response = await fetch({
    url: _url,
    method: "get",
  });
  return response;
};

TemplateService.addUserToTemplate = async (data: AddUserToTemplateType):Promise<AxiosResponse> => {
  const response = await fetch({
    url: _url,
    method: "post",
    data
  });
  return response;
};

TemplateService.getAUserTemplate = async (id: number):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/${id}`,
    method: "get",
  });
  return response;
};

TemplateService.getAllTemplate = async ():Promise<AxiosResponse> => {
  const response = await fetch({
    url: t_url,
    method: "get",
  });
  return response;
};

export default TemplateService;
