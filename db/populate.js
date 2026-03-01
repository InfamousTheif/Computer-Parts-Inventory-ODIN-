import { Client } from "pg";
import '../utils/dotenvHandler.js'

const SQL = `
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(20) NOT NULL CHECK(LENGTH(TRIM(name)) > 0),
  category VARCHAR(10) NOT NULL CHECK(LENGTH(TRIM(name)) > 0),
  img_dest VARCHAR(255) NOT NULL CHECK(LENGTH(TRIM(img_dest)) > 0),
  img_name VARCHAR(255) NOT NULL CHECK(LENGTH(TRIM(img_name)) > 0)
);

INSERT INTO items (name, category, img_dest, img_name)
  VALUES ('Keyboard', 'input', '/user-images/', 'komputer.png'),
         ('Monitor', 'output', '/user-images/', 'komputer.png');
`;

async function populatedb() {
  console.log('seeding...');

  const client = new Client({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_DB,
    password: process.env.DATABASE_PASS,
    port: process.env.DATABASE_PORT
  })

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Done");
  }catch(err) {
    console.log(`Error: ${err}`); 
  }finally {
    await client.end();
  }
}

populatedb()