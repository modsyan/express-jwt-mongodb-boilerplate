import mongoose from "mongoose";
import { getDbConnectionString } from "../../environment/env";
import { LOGGER } from "../utilities/logger";

export const dbConnection = async () => {
  const dbConnectionString = getDbConnectionString();
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(dbConnectionString);
    LOGGER.info(
      `connected successfully with database: ${mongoose.connection.db.namespace}`
    );
  } catch (e) {
    console.log("MONGO_DB FAILED CONNECTION");
    process.exit(0);
  }
};
