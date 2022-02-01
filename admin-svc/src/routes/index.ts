import { createNewProduct } from "../controllers/createProductsController";
import { Router } from "express";
import { adminAuthCheck } from "../middlewares";
const route = Router();

route.post("/createProduct", adminAuthCheck, createNewProduct);

export default route;
