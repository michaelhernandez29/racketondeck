const ENV = process.env;

export default {
	port: ENV.PORT ?? 9232,
	logLevel: ENV.LOG_LEVEL ?? 'debug',
};
