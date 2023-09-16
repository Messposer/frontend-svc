import fetch from "auth/axios";
import { AxiosResponse } from "axios";
import { CreateMessageScheduleType, CreateScheduleType, ScheduleServiceType } from "./types/ScheduleServiceType";

let ScheduleService: ScheduleServiceType = {};
const _url = "scheduler";
const _message_url = "message-scheduler";

ScheduleService.createSchedule = async (data: CreateScheduleType):Promise<AxiosResponse> => {
  const response = await fetch({
    url: _url,
    method: "post",
    data
  });
  return response;
};

ScheduleService.createMessageSchedule = async (data: CreateMessageScheduleType):Promise<AxiosResponse> => {
  const response = await fetch({
    url: _message_url,
    method: "post",
    data
  });
  return response;
};

ScheduleService.getSchedule = async (id: number):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/${id}`,
    method: "get",
  });
  return response;
};

ScheduleService.deleteSchedule = async (id: number):Promise<AxiosResponse> => {
  console.log(id)
  const response = await fetch({
    url: `${_url}/${id}`,
    method: "delete",
  });
  return response;
};

export default ScheduleService;
