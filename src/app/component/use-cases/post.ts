//src/app/component/use-cases/post.ts
export default function createPost({
  makeInputObj,
  findDocuments,
  insertDocument,
  get,
  logger,
}) {
  return Object.freeze({ post });

  async function post({ params, dbConfig, errorMsgs }) {
    try {
      logger.info("[POST][USE-CASE] Inserting object process - START!");
      const userFactory = makeInputObj({ params });

      const user = {
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

      logger.info(
        `[POST][USE-CASE] Prepared user data: ${JSON.stringify(user)}`
      );

      let query = { $or: [{ username: user.username }, { email: user.email }] };
      const checkDuplicate = await findDocuments({ query, dbConfig });
      logger.info(
        `[POST][USE-CASE] Duplicate check: ${JSON.stringify(checkDuplicate)}`
      );

      if (checkDuplicate.length) {
        throw new Error(errorMsgs.EXISTING_USER);
      }

      const savedUser = await insertDocument({ document: user, dbConfig });
      logger.info(`[POST][USE-CASE] User saved: ${JSON.stringify(savedUser)}`);

      return await get({ params: { username: user.username } });
    } catch (error) {
      logger.error(`[POST][USE-CASE] Error: ${error.message}`);
      throw error;
    }
  }
}
