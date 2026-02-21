import { Router } from "express";
const homeRouter = Router();
import * as homeController from '../controllers/homeController.js';

homeRouter.get("/", homeController.renderIndex);

homeRouter.get("/addItem", homeController.renderAddForm)

homeRouter.post("/addItem", homeController.handleAddForm)

homeRouter.get("/updateItem", homeController.renderUpdateForm)

homeRouter.post("/updateItem", homeController.handleUpdateForm)

homeRouter.get("/deleteItem", homeController.renderDeleteForm)

homeRouter.post("/deleteItem", homeController.handleDeleteForm)

export { homeRouter }