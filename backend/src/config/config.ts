import { CorsOptions } from "cors";
import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8000;
export const CORS = process.env.CORS || "http://localhost:3000";
export const corsOption: CorsOptions = {
  origin: [CORS],
  credentials: true,
};

export const JWT_SECRET = process.env.JWT_SECRET as string;
//Database Config
const db = new URL(process.env.DATABASE_URL as string);

export const DB_CONFIG = {
  host: db.hostname,
  port: Number(db.port || 3306),
  user: decodeURIComponent(db.username),
  password: decodeURIComponent(db.password),
  database: db.pathname.replace("/", ""),
  connectionLimit: 1,
};
