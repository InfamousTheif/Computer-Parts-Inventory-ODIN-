import * as db from "../db/queries.js";
import { body, validationResult, matchedData } from "express-validator";

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

// Data validation

const nameLenErr = "Item name must be between 1 and 20 characters";
const validCategories = ["input", "output", "software", "storage"];

const validatPost = [
  body("name").notEmpty().withMessage("Name is required").trim().isLength({ min:1, max:20 }).withMessage(nameLenErr),

  body("category").notEmpty().withMessage("Category is required").isIn(validCategories).withMessage(`Value must be one of the following: ${validCategories.join(',')}`),
]

async function handleAddForm(req, res) {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return
  }
  const userPost = matchedData(req);
  const userImg = req.file
  await db.addItem(userPost, userImg);
  console.log(req.file);
  console.log(req.body);
  res.redirect("/")
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
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return
  }
  const userPost = matchedData(req) || {};
  const userImg = req.file;
  const { Id } = req.query || {};
  await db.updateItem(Id, userPost, userImg);
  console.log(req.file);
  console.log(req.body);
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

export { renderIndex, renderAddForm, handleAddForm, renderUpdateForm, handleUpdateForm, renderDeleteForm, handleDeleteForm, validatPost }