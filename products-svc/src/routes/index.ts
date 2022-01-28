import { Router } from "express";
import { getAllProducts } from "../controllers/products-con";
const route = Router();

route.post("/getAllProducts", getAllProducts);

export default route;
