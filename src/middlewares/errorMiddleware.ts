import { ErrorRequestHandler } from "express";
import { LOGGER } from "../utilities/logger";
import ApiError from "../models/api-error.model";

export const errorHandler: ErrorRequestHandler = (err: ApiError, _req, res, _next) => {

  if (err.source) {
    LOGGER.error(`Uncaught exception: ${err.source}`);
  }

  // return res
  //   .status(500)
  //   .send("Oops, an unexpected error occurred, please try again");

  const statusCode = err.statusCode || 500;
  const message = err.source || err.message;

  return res.status(err.statusCode).json({
    status: 'failed',
    statusCode ,
    message,
  })

};
