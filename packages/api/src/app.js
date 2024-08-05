import express from 'express';

import config from './config/index.js';
import esmResolver from './middlewares/esmResolver.js';
import logger from './helpers/logger.js';
import openapi from './lib/openapi.js';
import path from 'node:path';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'node:url';
import * as openApiValidator from 'express-openapi-validator';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const apiSpec = await openapi.loadSpec(path.join(__dirname, 'openapi', 'api.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiSpec));
app.use(
	openApiValidator.middleware({
		apiSpec,
		validateRequests: true,
		validateResponses: true,
		operationHandlers: {
			basePath: path.join(__dirname, 'controllers'),
			resolver: esmResolver,
		},
	}),
);

const PORT = config.port;
app.listen(PORT, () => {
	logger.error(`Server listening on port ${PORT}`);
});
