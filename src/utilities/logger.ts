import fs from "fs";
import path from "path";
import { pino } from "pino";
import PinoPretty from "pino-pretty";

const streams: { write: any }[] = [
  process.env.NODE_ENV === "production" ? process.stdout : PinoPretty(),
  fs.createWriteStream(path.join(__dirname, "..", "process.log")),
];

export const LOGGER = pino(
  {
    redact: ["body.password"],
    formatters: {
      bindings: () => ({}),
    },
  },
  pino.multistream(streams)
);
