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
	const originalConfig = error.config;
	if (originalConfig.url !== "auth/login" && error.response) {
		if (error.response?.status === 401) {
			if(localStorage.getItem(AUTH_ACTION_TYPES.REFRESH_TOKEN)){
				const data = {
					refresh_token: localStorage.getItem(AUTH_ACTION_TYPES.REFRESH_TOKEN)
				};
				try {
					const response : any = await service.post(`${API_BASE_URL}/auth/refresh`, data);
					console.log(response)
					const { token } = response 
					localStorage.setItem(AUTH_ACTION_TYPES.AUTH_TOKEN, token);
					return service(originalConfig);
				} catch (_error: any) {
					return Promise.reject(_error);
				}
			}else{
				localStorage.removeItem(AUTH_ACTION_TYPES.AUTH_TOKEN);
				localStorage.removeItem(AUTH_ACTION_TYPES.REFRESH_TOKEN);
				localStorage.removeItem(AUTH_ACTION_TYPES.REDIRECT_PATH);
				window.location.reload();
			}
		}
	}
    return Promise.reject(error);
});

export default service