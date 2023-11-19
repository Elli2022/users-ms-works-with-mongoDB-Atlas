//src/app/component/use-cases/index.ts
import createPost from "./post";
import createGet from "./get";
import config from "../../config";
import { logger } from "../../libs/logger";
import { makeInputObj, makeOutputObj } from "../entities";
import { insertDocument, findDocuments } from "../data-access";
import { insertOneDocument } from "../../libs/mongodb";

const dbConfig = config.DB_CONFIG;
const errorMsgs = config.ERROR_MSG;

const get = ({ params }) =>
  createGet({
    makeInputObj,
    findDocuments,
    makeOutputObj,
    logger,
  }).get({
    params,
    dbConfig,
    errorMsgs,
  });

const post = ({ params }) =>
  createPost({
    makeInputObj,
    insertDocument,
    findDocuments,
    get,
    logger,
  }).post({
    params,
    dbConfig: config.DB_CONFIG,
    errorMsgs: errorMsgs.post,
  });

export { post, get };
