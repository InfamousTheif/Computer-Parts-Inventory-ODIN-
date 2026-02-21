import { Pool } from "pg";
import '../utils/dotenvHandler.js';

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_DB,
  password: process.env.DATABASE_PASS,
  port: process.env.DATABASE_PORT
})

export { pool }