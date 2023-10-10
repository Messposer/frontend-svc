import fetch from "auth/axios";
import { AxiosResponse } from "axios";
import { AddUserSubscriptionType, SubscriptionServiceType } from "./types/SubscriptionServiceType";

let SubscriptionService: SubscriptionServiceType = {};
const _url = "subscription";
const _url_payment = "payment";

SubscriptionService.addUserToSubscription = async (data: AddUserSubscriptionType):Promise<AxiosResponse> => {
  const response = await fetch({
    url: _url,
    method: "post",
    data,
  });
  return response;
};

SubscriptionService.getUserSubscription = async ():Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/user/subscription`,
    method: "get",
  });
  return response;
};

SubscriptionService.getUserPayments = async ():Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url_payment}/user/payments`,
    method: "get",
  });
  return response;
};

SubscriptionService.getPaymentDetails = async (id: number):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url_payment}/${id}`,
    method: "get",
  });
  return response;
};

SubscriptionService.getAllSubscription = async ():Promise<AxiosResponse> => {
  const response = await fetch({
    url: _url,
    method: "get",
  });
  return response;
};

export default SubscriptionService;
