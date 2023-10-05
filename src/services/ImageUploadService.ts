import fetch from "auth/axios";
import { AxiosResponse } from "axios";
import { ImageUploadServiceType } from "./types/ImageUploadService";

let ImageUploadService: ImageUploadServiceType = {};
const _url = "image-upload";

ImageUploadService.uploadMedia = async (data: any):Promise<AxiosResponse> => {
  const response = await fetch({
    url: _url,
    method: "post",
    data
  });
  return response;
};

ImageUploadService.getUserMedia = async ():Promise<AxiosResponse> => {
  const response = await fetch({
    url: _url,
    method: "get",
  });
  return response;
};

ImageUploadService.getAMedia = async (id: number):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/${id}`,
    method: "get",
  });
  return response;
};

ImageUploadService.deleteMedia = async (id: number):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/${id}`,
    method: "delete",
  });
  return response;
};

export default ImageUploadService;
