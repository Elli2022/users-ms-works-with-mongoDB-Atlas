//src/app/index.ts
// Läs in .env-filen
require("dotenv").config();

import config from "./config";
import { server } from "./initializers/express";
import { logger } from "./libs/logger";

try {
  logger.info(`[${config.APP_NAME}] Bootstrapping micro service`);
  server({ hostname: config.NODE_HOSTNAME, port: config.NODE_PORT });
} catch (error) {
  logger.error(`[${name}] Caught exception: ${error}`);
}
