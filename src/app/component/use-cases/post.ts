export default function createPost({
  makeInputObj,
  findDocuments,
  insertDocument,
  get,
  logger,
}) {
  return Object.freeze({ post });

  async function post({ params, dbConfig, errorMsgs }) {
    let user;
    logger.info("[POST][USE-CASE] Inserting object process - START!");
    const userFactory = makeInputObj({ params });

    user = {
      username: userFactory.username(),
      password: userFactory.password(),
      email: userFactory.email(),
      role: userFactory.role(),
      usernameHash: userFactory.usernameHash(),
      emailHash: userFactory.emailHash(),
      usernamePasswordHash: userFactory.usernamePasswordHash(),
      created: userFactory.created(),
      modified: userFactory.modified(),
    };

    // 'or' query for duplicates
    let query = { $or: [{ username: user.username }, { email: user.email }] };
    const checkDuplicate = await findDocuments({ query, dbConfig });
    if (checkDuplicate.length) throw new Error(errorMsgs.EXISTING_USER);

    const savedUser = await insertDocument({ document: user, dbConfig });
    logger.info(`Användare ${savedUser.username} skapades`); // Användare skapades loggmeddelande

    const inserted = get({ params: { username: user.username } });

    return inserted;
  }
}
