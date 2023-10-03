import fetch from "auth/axios";
import { AxiosResponse } from "axios";
import { AddTemplateToSchedulePayloadType, CreateMessageScheduleType, CreateScheduleType, ScheduleServiceType } from "./types/ScheduleServiceType";

let ScheduleService: ScheduleServiceType = {};
const _url = "scheduler";
const _message_url = "message-scheduler";
const _contact_schedule_url = "contact-schedule";

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

ScheduleService.addTemplateToSchedule = async (id: number, data: AddTemplateToSchedulePayloadType):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/add-template-to-schedule/${id}`,
    method: "put",
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

ScheduleService.getContactSchedule = async (id: number):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_contact_schedule_url}/contacts/${id}`,
    method: "get",
  });
  return response;
};

ScheduleService.deleteSchedule = async (id: number):Promise<AxiosResponse> => {
  const response = await fetch({
    url: `${_url}/${id}`,
    method: "delete",
  });
  return response;
};

export default ScheduleService;
