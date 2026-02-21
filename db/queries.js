import { pool } from "./pool.js";

async function getItems() {
  const { rows } = await pool.query('SELECT * FROM items');
  return rows;
}

async function addItem(userPost) {
  const { name, category } = userPost;
  await pool.query('INSERT INTO items (name, category) VALUES($1, $2)', [name, category])
}

async function updateItem(itemId, userPost) {
  const { name, category } = userPost;
  await pool.query(`UPDATE items SET name = $1, category = $2 WHERE id = ${itemId}`, [name, category])
}

export { getItems, addItem, updateItem }