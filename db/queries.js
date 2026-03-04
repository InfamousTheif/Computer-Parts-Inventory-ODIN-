import { pool } from "./pool.js";
import { deleteFile } from "../controllers/deleteImg.js";

async function getItems() {
  const { rows } = await pool.query('SELECT * FROM items');
  return rows;
}

async function addItem(userPost, userImg) {
  const { name, category } = userPost;
  const { filename, destination } = userImg;
  await pool.query('INSERT INTO items (name, category, img_dest, img_name) VALUES($1, $2, $3, $4)', [name, category, destination, filename]);
}

async function updateItem(itemId, userPost, userImg) {
  const { name, category } = userPost;
  const { filename, destination } = userImg;
  const { rows } = await pool.query('SELECT * FROM items where id = $1', [itemId])
  const { img_dest, img_name } = rows[0];
  await deleteFile(img_dest, img_name);
  await pool.query(`UPDATE items SET name = $1, category = $2, img_dest = $3, img_name = $4 WHERE id = ${itemId}`, [name, category, destination, filename]);
}

async function deleteItem(itemId, password, res) {
  if (password === 'hello123456?') {
    const { rows } = await pool.query('SELECT * FROM items where id = $1', [itemId])
    const { img_dest, img_name } = rows[0];
    await deleteFile(img_dest, img_name);
    await pool.query(`DELETE FROM items WHERE id = $1`, [itemId]);
    res.redirect("/");
  };
  
  res.status(401).sendFile("views/passwordError.html", {root: process.cwd()});
  
}

export { getItems, addItem, updateItem, deleteItem }