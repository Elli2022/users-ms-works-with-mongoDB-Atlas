// src/app/component/use-cases/login.ts
const crypto = require("crypto");

export default function createLogin({ findDocuments, jwt, logger }) {
  return Object.freeze({ login });

  async function login({ username, password, dbConfig }) {
    try {
      logger.info("[LOGIN][USE-CASE] Login process - START!");
      logger.info(
        `[LOGIN][USE-CASE] Attempting login for username: ${username}`
      );

      const query = { username };
      const users = await findDocuments({ query, dbConfig });
      const user = users[0];

      if (!user) {
        logger.warn("[LOGIN][USE-CASE] User not found in database");
        throw new Error("Användaren hittades inte.");
      }

      logger.info(`[LOGIN][USE-CASE] User found: ${JSON.stringify(user)}`);

      // Hashar inkommande lösenord med md5 och jämför
      const hashedPassword = crypto
        .createHash("md5")
        .update(password)
        .digest("hex");
      logger.info(
        `[LOGIN][USE-CASE] Hashed incoming password: ${hashedPassword}`
      );

      if (hashedPassword !== user.passwordHash) {
        logger.warn("[LOGIN][USE-CASE] Incorrect password");
        throw new Error("Felaktigt lösenord.");
      }

      // Skapar JWT-token
      const token = jwt.sign({ userId: user.id }, "din_jwt_secret", {
        expiresIn: "1h",
      });
      logger.info("[LOGIN][USE-CASE] Login successful. Token generated.");

      return token;
    } catch (error) {
      logger.error(`[LOGIN][USE-CASE] Error: ${error.message}`);
      throw error;
    }
  }
}
