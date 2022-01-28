import { Router } from "express";
import { registerNewUserController } from "../controllers/user-con";
const route = Router();

route.post("/register", registerNewUserController);

export default route;
