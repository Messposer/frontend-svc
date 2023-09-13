export interface ScheduleServiceType {
  createSchedule?: any;
  getSchedule?: any;
  createMessageSchedule?: any;
}

export interface CreateScheduleType {
  name: string;
  contact_group_id: number;
  scheduledDate:string;
}

export interface CreateMessageScheduleType {
  text: string;
  autoGenerated: string | null;
  chat_id?: number;
  scheduler_id: number;
  transporter: string;
}