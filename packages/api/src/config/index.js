const ENV = process.env;

export default {
	port: ENV.PORT ?? 9232,
	logLevel: ENV.LOG_LEVEL ?? 'debug',
	crypto: {
		saltRounds: ENV.CRYPTO_SALT_ROUNDS ? Number.parseInt(ENV.CRYPTO_SALT_ROUNDS, 10) : 10,
		privateKey: ENV.CRYPTO_PRIVATE_KEY ?? 'UCA0txMmjMk6pRfJK3wWLsykHQAzg9ZV',
		expiresIn: ENV.CRYPTO_EXPIRES_IN,
	},
	databases: {
		postgres: {
			name: ENV.POSTGRES_NAME,
			username: ENV.POSTGRES_USERNAME,
			password: ENV.POSTGRES_PASSWORD,
			host: ENV.POSTGRES_HOST,
		},
	},
};
