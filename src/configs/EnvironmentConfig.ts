const dev = {
	API_ENDPOINT_URL: process.env.REACT_APP_DEVELOPMENT_API_ENDPOINT_URL
};

const prod = {
  API_ENDPOINT_URL: process.env.REACT_APP_PRODUCTION_API_ENDPOINT_URL

};

const test = {
	API_ENDPOINT_URL: process.env.REACT_APP_TEST_API_ENDPOINT_URL
};

const getEnv = () => {
	switch (process.env.NODE_ENV) {
		case 'development':
			return dev
		case 'production':
			return prod
		case 'test':
			return test
		default:
			break;
	}
}


export const env = getEnv()
