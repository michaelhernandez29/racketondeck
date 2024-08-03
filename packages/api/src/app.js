import express from 'express';

import config from './config/index.js';
import logger from './helpers/logger.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = config.port;
app.listen(PORT, () => {
	logger.error(`Server listening on port ${PORT}`);
});
