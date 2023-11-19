//src/tests/config/index.ts
import * as path from "path";
const APP_NAME = "AUTH-MS-TEST";
const NODE_ENV = "test";
const FILE_FOLDER_NAME = "data";
const FILE_FOLDER_PATH = path.join(__dirname, "../data/");
const FILE_DB_NAME = "users.json";
const FILE_DB_PATH = `${FILE_FOLDER_PATH}/${FILE_DB_NAME}`;

const DB_CONFIG = {
  dbName: "db_my_app_test",
  dbUri: process.env.MONGODB_DB_URL, // Använd miljövariabeln för anslutnings-URL
  dbColl: "coll_users",
};

const ERROR_MSG = {
  post: {
    MISSING_PARAMETER: "missing parameter: ",
    EXISTING_USER: "user already exists",
    INVALID_EMAIL: "invalid email",
  },
};

const TEST_DATA = {
  user1: {
    username: "user1",
    password: "password1",
    email: "user1@example.com",
  },
  user2: {
    username: "user2",
    password: "password2",
    email: "user2@example.com",
  },
};

export default Object.freeze({
  APP_NAME,
  NODE_ENV,
  ERROR_MSG,
  DB_CONFIG,
  FILE_FOLDER_NAME,
  FILE_FOLDER_PATH,
  FILE_DB_NAME,
  FILE_DB_PATH,
  TEST_DATA,
});
