import { Router } from "express";
import { authCheck } from "../middlewares";
import {
	createNewProduct,
	getAllProducts,
	getProductsBySearch,
} from "../controllers/productsController";
const route = Router();

route.get("/getAllProducts", getAllProducts);
route.get("/getProductsBySearch", getProductsBySearch);

//Todo , Temp Route remove before production
route.post("/createProduct", authCheck, createNewProduct);

export default route;
