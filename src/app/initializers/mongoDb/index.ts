// src/app/initializers/mongoDb/index.ts
import { MongoClient } from "mongodb";
import config from "../../config"; // Importera konfigurationen
import { logger } from "../../libs/logger";

class mongoDBClient {
  private dbName: string;
  private dbUri: string;
  private dbColl: string;
  private connection: MongoClient | null;
  private db: any;

  constructor() {
    this.dbName = config.DB_CONFIG.dbName;
    this.dbUri = config.DB_CONFIG.dbUri;
    this.dbColl = config.DB_CONFIG.dbColl;
    this.connection = null;
    this.db = null;
  }

  async connect() {
    // Anslut utan de borttagna alternativen
    this.connection = await MongoClient.connect(this.dbUri);
    this.db = this.connection.db(this.dbName);
    logger.info("[MONGODB] Connection successful.");
  }

  async findDocumentsByQuery({ query }: { query: object }) {
    await this.connect();
    const results = await this.db.collection(this.dbColl).find(query).toArray();
    await this.close();
    return results;
  }

  async insertDocument({ document }: { document: object }) {
    await this.connect();
    const results = await this.db.collection(this.dbColl).insertOne(document);
    await this.close();
    return results;
  }

  async updateDocument({ query, values }: { query: object; values: object }) {
    await this.connect();
    const results = await this.db
      .collection(this.dbColl)
      .updateOne(query, { $set: values });
    await this.close();
    return results;
  }

  async close() {
    if (this.connection) {
      await this.connection.close();
      logger.info("[MONGODB] Connection closed.");
    }
  }

  async dropDB() {
    if (this.db) {
      await this.db.dropDatabase();
      logger.info(`[MONGODB] Dropped DB ${this.dbName}`);
    }
  }
}

export default new mongoDBClient(); // Exportera en instans av klienten
