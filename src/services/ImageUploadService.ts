import fetch from "auth/axios";
import { AxiosResponse } from "axios";
import { ImageUploadServiceType } from "./types/ImageUploadService";

let ImageUploadService: ImageUploadServiceType = {};
const _url = "image-upload";

ImageUploadService.uploadImage = async (data: any):Promise<AxiosResponse> => {
  const response = await fetch({
    url: _url,
    method: "post",
    data
  });
  return response;
};

export default ImageUploadService;
