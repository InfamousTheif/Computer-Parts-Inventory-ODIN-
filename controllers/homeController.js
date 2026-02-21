import * as db from "../db/queries.js";

async function renderIndex(req, res) {
  const items = await db.getItems();
  const title = 'Inq\'s Inventory';
  res.render('index', { 
    title,
    items
  });
}

function renderAddForm(req, res) {
  const title = "Add Items Form"
  res.render('add-item-form', {
    title
  })
}

async function handleAddForm(req, res) {
  const userPost = req.body;
  await db.addItem(userPost);
  res.redirect("/");
}

export { renderIndex, renderAddForm, handleAddForm }