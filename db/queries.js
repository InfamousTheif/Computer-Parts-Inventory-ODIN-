import { pool } from "./pool.js";

async function getItems() {
  const { rows } = await pool.query('SELECT * FROM items');
  return rows;
}

async function addItem(userPost) {
  const { name, category } = userPost;
  await pool.query('INSERT INTO items (name, category) VALUES($1, $2)', [name, category])
}

export { getItems, addItem }