import * as db from "../db/queries.js";

async function renderIndex(req, res) {
  const items = await db.getItems();
  const title = 'Inq\'s Inventory';
  const { filter } = req.query;
  res.render('index', { 
    title,
    items,
    filter
  });
}

function renderAddForm(req, res) {
  const title = "Add Items Form";
  res.render('add-item-form', {
    title
  });
}

async function handleAddForm(req, res) {
  const userPost = req.body;
  await db.addItem(userPost);
  res.redirect("/");
}

function renderUpdateForm(req, res) {
  const title = "Update Items Form";
  const { Id } = req.query;
  res.render('update-item-form', {
    title,
    Id
  });
}

async function handleUpdateForm(req, res) {
  const userPost = req.body || {};
  const { Id } = req.query || {};
  await db.updateItem(Id, userPost);
  res.redirect("/");
}

function renderDeleteForm(req, res) {
  const title = "Delete Items Form";
  const { Id } = req.query;
  res.render('delete-item-form', {
    title,
    Id
  });
}

async function handleDeleteForm(req, res) {
  const { password } = req.body;
  const { Id } = req.query || {};
  await db.deleteItem(Id, password, res);
}

export { renderIndex, renderAddForm, handleAddForm, renderUpdateForm, handleUpdateForm, renderDeleteForm, handleDeleteForm }