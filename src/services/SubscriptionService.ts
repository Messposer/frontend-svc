import fetch from "auth/axios";
import { AxiosResponse } from "axios";
import { AddUserSubscriptionType, SubscriptionServiceType } from "./types/SubscriptionServiceType";

let SubscriptionService: SubscriptionServiceType = {};
const _url = "subscription";

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
    url: _url,
    method: "get",
  });
  return response;
};

export default SubscriptionService;
