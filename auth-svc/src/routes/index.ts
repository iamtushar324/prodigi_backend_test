import { Router } from "express";
import {
	registerNewUserController,
	loginUserController,
	getAccessTokenFromRefreshTokenController,
	logoutUserController,
} from "../controllers/user-con";
const route = Router();

route.post("/register", registerNewUserController);
route.post("/login", loginUserController);
route.get("/accessToken", getAccessTokenFromRefreshTokenController);
route.delete("/logout", logoutUserController);

export default route;
