//src/app/initializers/express/index.ts
import * as express from "express";
import createLogin from "../../component/use-cases/login";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cors from "cors";
import * as helmet from "helmet";
import createServer from "./libs/express";
import { routes } from "../../component/controller";
import { logger } from "../../libs/logger";
import { findDocuments } from "../../libs/mongodb";

import jwt from "jsonwebtoken";
import config from "../../config/index";

const dbConfig = config.DB_CONFIG;
const app = express();
const json = express.json;
const urlencoded = express.urlencoded;

// Skapar login-funktionen med beroenden
const login = createLogin({
  findDocuments,
  jwt,
  logger,
});

// Lägger till login-route i mina routes
routes.push({
  path: "/api/login",
  method: "post",
  component: async (req, res) => {
    try {
      const token = await login.login({
        username: req.body.username,
        password: req.body.password,
        dbConfig: config.DB_CONFIG,
      });
      res.json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
});

const server = ({ hostname, port }) =>
  createServer({
    json,
    urlencoded,
    app,
    cors,
    compression,
    helmet,
    logger,
  }).server({ hostname, port, routes });

export { server };
