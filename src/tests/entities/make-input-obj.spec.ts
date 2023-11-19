//src/tests/entities/make-input-obj.spec.ts
require("dotenv").config();

const expect = require("chai").expect;
import * as crypto from "crypto";
import * as sanitize from "sanitize-html";
import config from "../config";
import { logger } from "../../app/libs/logger";
import makeInputObjFactory from "../../app/component/entities/make-input-object";

const errorMsgs = config.ERROR_MSG.post;
const md5 = (text) =>
  crypto.createHash("md5").update(text, "utf8").digest("hex");

const makeInputObj = ({ params }) =>
  makeInputObjFactory({ md5, sanitize }).inputObj({ params, errorMsgs });

describe("make-input-object", () => {
  it("should validate input", () => {
    const params = {
      username: config.TEST_DATA.user1.username,
      password: config.TEST_DATA.user1.password,
    };
    const makeInput = makeInputObj({ params });

    const user = {
      username: makeInput.username(),
      password: makeInput.password(),
      created: makeInput.created(),
      modified: makeInput.modified(),
    };

    expect(user.username).to.equal(config.TEST_DATA.user1.username);
  });

  it("should not validate an empty object", () => {
    try {
      const params = {};
      makeInputObj({ params });
    } catch (e) {
      expect(e.message).to.equal(errorMsgs.MISSING_PARAMETER + "username");
    }
  });

  it("should not validate an empty object", () => {
    try {
      const params = {
        username: config.TEST_DATA.user1.username,
      };
      makeInputObj({ params });
    } catch (e) {
      expect(e.message).to.equal(errorMsgs.MISSING_PARAMETER + "password");
    }
  });
});
