
import { env } from "./EnvironmentConfig";

export const APP_NAME = "Messponser";
export const API_BASE_URL = `${env?.API_ENDPOINT_URL}/api/v1`;
export const DASHBOARD_PREFIX_PATH = "/dashboard";
export const ACCOUNT_PREFIX_PATH = "/account";
export const CATEGORY_PREFIX_PATH = "/categories";
export const SETTINGS_PREFIX_PATH = "/settings";
export const PRODUCT_PREFIX_PATH = "/products";

export const ERROR_MESSAGES = {
  NETWORK_CONNECTIVITY: "No response from server, check you connectivity",
}