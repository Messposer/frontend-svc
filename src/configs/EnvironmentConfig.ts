const dev = {
	API_ENDPOINT_URL: "http://localhost:4000"
};

const prod = {
  API_ENDPOINT_URL: "https://messponser-backend-scv-4c6ec4552ac0.herokuapp.com"

};

const test = {
	API_ENDPOINT_URL: "http://localhost:4000"
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
