import env from "../Config/env";
import { Client, ID, TablesDB } from "appwrite";

export class DatabaseService {
  client;
  table;

  constructor() {
    this.client = new Client()
      .setEndpoint(env.APPWRITE_URL)
      .setProject(env.APPWRITE_PROJECT_ID);

    this.table = new TablesDB(this.client);
  }

  async connect({ fullName, email, message }) {
    try {
      const result = await this.table.createRow({
        databaseId: env.APPWRITE_DB_ID,
        tableId: env.APPWRITE_TABLE_CONTACT_ID,
        rowId: ID.unique(),
        data: {
          fullName,
          email,
          message,
        },
      });

      if (!result) {
        throw new Error("Something went wrong");
      }

      return {
        status: true,
        result,
      };
    } catch (error) {
      return {
        status: false,
        message: error.message || "Unknown error",
        type: error.type || "Error",
        code: error.code || 500,
      };
    }
  }
}
