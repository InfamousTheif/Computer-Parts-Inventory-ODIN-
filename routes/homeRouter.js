import { Router } from "express";
const homeRouter = Router();
import * as homeController from '../controllers/homeController.js';
import { upload } from "../controllers/upload.js";

homeRouter.get("/", homeController.renderIndex);

homeRouter.get("/addItem", homeController.renderAddForm)

homeRouter.post("/addItem", upload.single('image'), homeController.validatPost, homeController.handleAddForm)

homeRouter.get("/updateItem", homeController.renderUpdateForm)

homeRouter.post("/updateItem", upload.single('image'), homeController.validatPost, homeController.handleUpdateForm)

homeRouter.get("/deleteItem", homeController.renderDeleteForm)

homeRouter.post("/deleteItem", homeController.handleDeleteForm)

export { homeRouter }