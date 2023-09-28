
import { env } from "./EnvironmentConfig";

export const APP_NAME = "Messponser";
export const API_BASE_URL = env?.API_ENDPOINT_URL;
export const DASHBOARD_PREFIX_PATH = "/dashboard";
export const CHAT_PREFIX_PATH = "/chats";
export const SETTING_PREFIX_PATH = "/setting";
export const REPORT_PREFIX_PATH = "/reports";
export const CONTACT_PREFIX_PATH = "/contacts";
export const CONTACT_GROUP_PREFIX_PATH = "/broadcast-list";
export const SCHEDULE_PREFIX_PATH = "/schedule-jobs";
export const TEMPLATE_PREFIX_PATH = "/template";

export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

export const ERROR_MESSAGES = {
  NETWORK_CONNECTIVITY: "No response from server",
}