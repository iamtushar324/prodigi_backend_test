import { Router } from "express";
import {
	registerNewUserController,
	loginUserController,
	getAccessTokenFromRefreshTokenController,
	logoutUserController,
	makeAdminController,
} from "../controllers/user-con";
import { superAdminAuthCheck } from "../middlewares";
const route = Router();

route.post("/register", registerNewUserController);
route.post("/login", loginUserController);
route.get("/accessToken", getAccessTokenFromRefreshTokenController);
route.delete("/logout", logoutUserController);
route.post("/makeAdmin", superAdminAuthCheck, makeAdminController);

export default route;
