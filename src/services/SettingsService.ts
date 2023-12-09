import fetch from "auth/axios";
import { AxiosResponse } from "axios";
import { AddNewSenderEmailType, SettingsServiceType, VerifySenderEmailDataType } from "./types/SettingsSerivceType";

let SettingsService: SettingsServiceType = {
  resendConfirmationCode: (id: number) => Promise<AxiosResponse>,
};
const _url = "sender-email";

SettingsService.addNewSenderEmail = async (data: AddNewSenderEmailType):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}`,
    method: "post",
    data
  });
  return response;
};

SettingsService.getUserSenderEmails = async ():Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/user/sender-emails`,
    method: "get",
  });
  return response;
};

SettingsService.getUserActiveSenderEmail = async ():Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/user/active-sender-emails`,
    method: "get",
  });
  return response;
};

SettingsService.deleteUserSenderEmail = async (id: number):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/${id}`,
    method: "delete",
  });
  return response;
};

SettingsService.resendConfirmationCode = async (id: number):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/resend-confirmation/${id}`,
    method: "put",
  });
  return response;
};

SettingsService.verifyUserSenderEmail = async (data: VerifySenderEmailDataType):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/verify-sender-email`,
    method: "post",
    data,
  });
  return response;
};

export default SettingsService;
