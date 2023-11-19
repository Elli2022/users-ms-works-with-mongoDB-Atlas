//src/app/component/entities/make-input-object.ts
export default function makeInputObjectFactory({ md5, sanitize }) {
  return Object.freeze({ inputObj });
  let localErrorMsgs = {};
  function inputObj({ params, errorMsgs }) {
    const {
      username,
      password,
      email,
      role,
      created = Date.now(),
      modified = Date.now(),
    } = params;

    return Object.freeze({
      username: () => checkUsername({ username, errorMsgs }),
      password: () => checkPassword({ password, errorMsgs }),
      email: () => checkEmail({ email, errorMsgs }),
      role: () => checkRole({ role }),
      usernameHash: () => hash({ param: username }),
      emailHash: () => hash({ param: email }),
      usernamePasswordHash: () => hash({ param: username + password }),
      created: () => created,
      modified: () => modified,
    });
  }

  function checkRole({ role }) {
    return role in ["user", "admin"] ? role : "user";
  }

  function checkUsername({ username, errorMsgs }) {
    checkRequiredParam({
      param: username,
      paramName: "username",
      errorMsgs,
    });
    username = sanitize(username);
    return username;
  }

  function checkPassword({ password, errorMsgs }) {
    checkRequiredParam({
      param: password,
      paramName: "password",
      errorMsgs,
    });
    password = md5(password);
    return password;
  }

  function checkEmail({ email, errorMsgs }) {
    checkRequiredParam({
      param: email,
      paramName: "email",
      errorMsgs,
    });
    email = sanitize(email);
    if (!isEmail({ email })) throw new Error(errorMsgs.INVALID_EMAIL);

    return email;
  }

  function hash({ param }) {
    sanitize(param);
    return md5(param);
  }

  function isEmail({ email }) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function checkRequiredParam({ param, paramName, errorMsgs }) {
    if (!param || param === "")
      throw new Error(`${errorMsgs.MISSING_PARAMETER}${paramName}`);
    return;
  }
}
