//src/app/component/entities/index.ts
import * as crypto from "crypto";
import * as sanitize from "sanitize-html";
import config from "../../config";
import makeInputObjFactory from "./make-input-object";
import makeOutputObjFactory from "./make-output-object";

const errorMsgs = config.ERROR_MSG.post;

const md5 = (text) =>
  crypto.createHash("md5").update(text, "utf8").digest("hex");

const makeInputObj = ({ params }) =>
  makeInputObjFactory({ md5, sanitize }).inputObj({ params, errorMsgs });

const makeOutputObj = ({ params }) =>
  makeOutputObjFactory().outputObj({ params });

export { makeInputObj, makeOutputObj };
