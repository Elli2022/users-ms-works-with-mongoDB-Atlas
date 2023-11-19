//src/app/component/data-access/index.ts
import {
  insertOneDocument,
  findDocuments as makeFindDocuments,
  updateDocument as makeUpdateDocument,
} from "../../libs/mongodb";

export const insertDocument = async ({ document }) => {
  const newUser = await insertOneDocument({ document });
  return newUser; // Se till att denna returnerar det sparade användarobjektet
};

const updateDocument = ({ query, values, dbConfig }) =>
  makeUpdateDocument({ query, values, ...dbConfig });

const findDocuments = ({ query, dbConfig }) =>
  makeFindDocuments({ query, ...dbConfig });

export { findDocuments, updateDocument };
