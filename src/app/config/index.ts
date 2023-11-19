//src/app/config/index.ts
const APP_NAME = process.env.NODE_NAME;
const NODE_ENV = process.env.NODE_ENV;
const NODE_HOSTNAME = process.env.NODE_HOSTNAME;
const NODE_PORT = process.env.NODE_PORT;
const FILE_FOLDER_NAME = process.env.NODE_FILE_FOLDER;
const FILE_FOLDER_PATH = process.cwd() + process.env.NODE_FILE_FOLDER;
const FILE_DB_NAME = process.env.NODE_DB_FILE;
const FILE_DB_PATH = `${FILE_FOLDER_PATH}/${FILE_DB_NAME}`;
const MONGO_DB_URL = process.env.MONGO_DB_URL;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const MONGO_DB_COLLECTION = process.env.MONGO_DB_COLLECTION;

const DB_CONFIG = {
  dbName: "db_my_app",
  dbUri: `${process.env.MONGODB_DB_URL}`,
  dbColl: "coll_users",
};

const ERROR_MSG = {
  post: {
    MISSING_PARAMETER: "missing parameter: ",
    EXISTING_USER: "user already exists",
    INVALID_EMAIL: "invalid email",
  },
};

export default Object.freeze({
  APP_NAME,
  ERROR_MSG,
  NODE_ENV,
  NODE_HOSTNAME,
  NODE_PORT,
  DB_CONFIG,
});
