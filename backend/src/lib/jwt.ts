import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
JWT_SECRET;

const refreshTokenExpiresIn = "1d";
const accessTokenExpiresIn = "15m";

export function signToken(payload: object, tokenType: "access" | "refresh") {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn:
      tokenType === "refresh" ? refreshTokenExpiresIn : accessTokenExpiresIn,
  });
}

export function verifyToken(token: string) {
  return (cb: (err: Error | null, decoded?: any) => void) =>
    jwt.verify(token, JWT_SECRET, cb);
}
