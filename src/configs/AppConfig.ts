
import { env } from "./EnvironmentConfig";

export const APP_NAME = "Messponser";
export const API_BASE_URL = env?.API_ENDPOINT_URL;
export const DASHBOARD_PREFIX_PATH = "/dashboard";
export const CHAT_PREFIX_PATH = "/chats";
export const REPORT_PREFIX_PATH = "/reports";
export const CONTACT_PREFIX_PATH = "/contacts";
export const CONTACT_GROUP_PREFIX_PATH = "/broadcast-list";
export const SCHEDULE_PREFIX_PATH = "/schedule-jobs";
export const TEMPLATE_PREFIX_PATH = "/template";
export const TEMPLATE_BUILDER_PREFIX_PATH = "/template-builder";
export const MEDIA_PREFIX_PATH = "/media";
export const SUBSCRIPTION_PREFIX_PATH = "/subscription";
export const TRANSACTIONS_PREFIX_PATH = "/transactions";
export const ACCOUNT_PREFIX_PATH = "/account";
export const SETTINGS_PREFIX_PATH = "/settings";

export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

export const MESSAGE_TRANSPORTER = {
  EMAIL: 'EMAIL',
  SMS: 'SMS',
  WHATSAPP: 'WHATSAPP',
  TELEGRAM: 'TELEGRAM',
}

export const VIEW_TEMPLATE_TYPE = {
  USER: 'USER',
  SYSTEM: 'SYSTEM',
};

export const SUBSCRIPTION_TYPE = {
  FREE: 'FREE',
  PREMIUM: 'PREMIUM',
};

export const PAYMENT_TYPE = {
  SUBSCRIPTION: 'SUBSCRIPTION',
  TOP_UP: 'TOP_UP',
};

export const PAYMENT_STATUS = {
  SUCCESS: 'SUCCESS',
  PENDING: 'PENDING',
  FAILED: 'FAILED',
  ABANDONED: 'ABANDONED',
  CANCELLED: 'CANCELLED',
  TIMEOUT: 'TIMEOUT',
  REVERSED: 'REVERSED',
  REFUNDED: 'REFUNDED',
  UNKNOWN: 'UNKNOWN',
};

export const ERROR_MESSAGES = {
  NETWORK_CONNECTIVITY: "No response from server, check you connectivity",
}