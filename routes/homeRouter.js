import { Router } from "express";
const homeRouter = Router();
import * as homeController from '../controllers/homeController.js';

homeRouter.get("/", homeController.renderIndex);

export { homeRouter }