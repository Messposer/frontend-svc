import axios, { AxiosResponse } from 'axios'
import { API_BASE_URL } from 'configs/AppConfig'
import { AUTH_ACTION_TYPES } from 'redux/constants/Auth'

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000
})

// Config
const TOKEN_PAYLOAD_KEY = 'authorization'

// API Request interceptor
service.interceptors.request.use((config: any) => {
	const jwtToken = localStorage.getItem(AUTH_ACTION_TYPES.AUTH_TOKEN);
	
	if (jwtToken) {
		config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken}`
	}

  return config
}, 
(error) => {
	// Do something with request error here
  Promise.reject(error)
})

// API respone interceptor
service.interceptors.response.use( (response: AxiosResponse) => {
	return response.data
}, 
async (error: any) => {
	// Remove token and redirect 
	localStorage.removeItem(AUTH_ACTION_TYPES.AUTH_TOKEN);
	Promise.reject(error);
});

export default service