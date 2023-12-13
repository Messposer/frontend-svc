import fetch from "auth/axios";
import {SaveCategoryPayloadType, UpdateProductPayloadType, UserServiceType } from "./types/UserServiceType";
import { AxiosResponse } from "axios";

let UserService: UserServiceType = {};
const categoryUrl = "category";
const productUrl = "products";

UserService.getAllCategories = async ():Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${categoryUrl}`,
    method: "get"
  });
  return response;
};

UserService.getACategory = async ():Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${categoryUrl}`,
    method: "get"
  });
  return response;
};

UserService.StoreACategory = async (data: SaveCategoryPayloadType):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${categoryUrl}`,
    method: "post",
    data,
  });
  return response;
};


UserService.UpdateACategory = async (id: string, data: SaveCategoryPayloadType): Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${categoryUrl}/${id}`,
    method: "put",
    data,
  });
  return response;
};


UserService.DeleteACategory = async (id: string) :Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${categoryUrl}/${id}`,
    method: "delete"
  });
  return response;
};

UserService.getAllProducts = async ():Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${productUrl}`,
    method: "get"
  });
  return response;
};

UserService.getAProduct = async ():Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${productUrl}`,
    method: "get"
  });
  return response;
};

UserService.StoreAProduct = async (data: FormData):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${productUrl}`,
    method: "post",
    data,
  });
  return response;
};


UserService.UpdateAProduct = async (id: string, data: UpdateProductPayloadType): Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${productUrl}/${id}`,
    method: "put",
    data,
  });
  return response;
};


UserService.DeleteAProduct = async (id: string) :Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${productUrl}/${id}`,
    method: "delete"
  });
  return response;
};

export default UserService;
