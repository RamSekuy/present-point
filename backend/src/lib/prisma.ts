import "dotenv/config";

import { DB_CONFIG } from "../config/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaMariaDb({ ...DB_CONFIG });
const db = new PrismaClient({ adapter, omit: { user: { password: true } } });
export default db;
