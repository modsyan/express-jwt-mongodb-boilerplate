import { config as dotEnvConfig } from "dotenv";
import { createApp } from "./app";
import { dbConnection } from "./loader/database";
import { getPortNumber } from "../environment/env";
import { LOGGER } from "./utilities/logger";

(async () => {
  dotEnvConfig();
  await dbConnection();
  const PORT = getPortNumber();
  const app = await createApp();
  app.listen(PORT, () =>
    LOGGER.info(`App is running at ${PORT} Port Number...`)
  );
})();
