import jwt from "jsonwebtoken";
import {getJwtSecret} from '../../environment/env';
import { JwtObject } from "../extensions/api.extension";

export function signJwt(obj: { userId: string }): string {
  return jwt.sign(obj, getJwtSecret(), {
    expiresIn: "10d",
  });
}

export function verifyJwt(token: string): JwtObject{
  return jwt.verify(token, getJwtSecret()) as JwtObject;
}
