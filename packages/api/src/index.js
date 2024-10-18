import express from 'express';

import compression from 'compression';
import cors from 'cors';
import * as openapiValidator from 'express-openapi-validator';
import helmet from 'helmet';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import url from 'url';

import logger from './helpers/logger.js';
import openapi from './helpers/openapi.js';
import postgres from './lib/databases/postgres.js';
import authHandler from './middlewares/authHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import esmResolver from './middlewares/esmResolver.js';
import requestHandler from './middlewares/requestHandler.js';

import config from './config/index.js';
const appConfig = config.app;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  const app = express();
  await postgres.authenticate();

  const apiSpec = path.join(__dirname, 'openapi', 'api.yaml');
  const apiSpecContent = await openapi.loadSpec(apiSpec);

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(helmet());
  app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
  app.use(compression());

  app.use(requestHandler);

  app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(apiSpecContent));
  app.use(
    openapiValidator.middleware({
      apiSpec: apiSpecContent,
      validateRequests: true,
      validateResponses: true,
      operationIdRequired: true,
      operationHandlers: {
        basePath: path.join(__dirname, 'controllers'),
        resolver: esmResolver,
      },
      validateSecurity: {
        handlers: {
          Bearer: authHandler,
        },
      },
    }),
  );

  app.use(errorHandler);

  const PORT = appConfig.port;
  app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
  });
} catch (error) {
  logger.error(`Failed to start the server: ${error.message}. Stack trace: ${error.stack}`);
}
