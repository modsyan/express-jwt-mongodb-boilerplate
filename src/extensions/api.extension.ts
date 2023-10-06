import { RequestHandler } from "express";

export type WithError<T> = T & { error: string };

export type ExpressHandler<req, res> = RequestHandler<
  string,
  Partial<WithError<res>>,
  Partial<req>,
  any
>;

export type ExpressHandlersWithParams<params, req, res> = RequestHandler<
  Partial<params>,
  Partial<WithError<res>>,
  Partial<req>,
  any
>;

export type ExpressHandlersWithQuery<req, res, query> = RequestHandler<
  string,
  Partial<WithError<res>>,
  Partial<req>,
  Partial<query>
>;

export interface JwtObject {
  userId: string;
}