import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../schema/user.entities.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import * as dotenv from "dotenv";

dotenv.config();

const {
  NEON_HOST,
  NEON_PORT,
  NEON_USERNAME,
  NEON_PASSWORD,
  NEON_DB,
  NODE_ENV,
} = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: NEON_HOST,
  port: parseInt(NEON_PORT || "5432"),
  username: NEON_USERNAME,
  password: NEON_PASSWORD,
  database: NEON_DB,
  // FOR NEON
  ssl: { rejectUnauthorized: false },
  synchronize: NODE_ENV === "dev" ? true : false,
  logging: NODE_ENV === "dev" ? false : false,
  entities: [User],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});
