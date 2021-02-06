export default {
	userName: "solace-cloud-client",
	password: process.env.REACT_APP_PASSWORD,
	invocationContext: {
		host: process.env.REACT_APP_SECURE_HOST,
		port: 8443,
		clientId: ""
	},
	timeout: 3,
	keepAliveInterval: 60,
	cleanSession: true,
	useSSL: true,
	reconnect: true
};