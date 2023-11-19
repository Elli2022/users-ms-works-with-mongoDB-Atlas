// src/app/libs/mongodb/index.ts
import MongoDBClient from "../../initializers/mongoDb";

export const insertOneDocument = async ({ document }) => {
  try {
    await MongoDBClient.connect();
    const result = await MongoDBClient.insertDocument({ document });
    return result;
  } finally {
    await MongoDBClient.close();
  }
};

export const findDocuments = async ({ query }) => {
  try {
    await MongoDBClient.connect();
    const results = await MongoDBClient.findDocumentsByQuery({ query });
    return results;
  } finally {
    await MongoDBClient.close();
  }
};

export const updateDocument = async ({ query, values }) => {
  try {
    await MongoDBClient.connect();
    const result = await MongoDBClient.updateDocument({
      query,
      values: { $set: values },
    });
    return result;
  } finally {
    await MongoDBClient.close();
  }
};

export const dropDb = async (dbConfig) => {
  try {
    await MongoDBClient.connect();
    await MongoDBClient.dropDB();
  } finally {
    await MongoDBClient.close();
  }
};
