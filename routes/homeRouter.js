import { Router } from "express";
const homeRouter = Router();

homeRouter.get("/", homeController);