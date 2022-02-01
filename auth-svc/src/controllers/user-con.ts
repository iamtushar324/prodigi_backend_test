import { userRegister } from "types/users";
import { Request, Response } from "express";
import {
	registerNewUserSvc,
	checkUserCredentialsAndReturnUserSvc,
	validateRefreshTokenAndReturnUserSvc,
	logoutUserWithRefreshTokenSvc,
	makeAdminSvc,
} from "../services/user-svc";
import { logger } from "../helpers";
const jwt = require("jsonwebtoken");

export async function registerNewUserController(
	req: Request,
	res: Response
): Promise<any> {
	try {
		const { name, email, password }: userRegister = req.body;

		//todo validate user data before creating user

		if (!name || !email || !password)
			return res.status(400).send("Please provide all required fields");

		const user: userRegister = {
			name,
			email,
			password,
		};

		const newUser = await registerNewUserSvc(user);

		if (!newUser) return res.status(500).send("Error creating user");

		return res
			.status(200)
			.send({ message: "User Created Successfully", id: newUser.id });
	} catch (error) {
		logger.error(error);
		return res.status(500).send("Error creating user");
	}
}

export async function loginUserController(
	req: Request,
	res: Response
): Promise<any> {
	try {
		const { email, password } = req.body;

		//todo validate user data before creating user

		if (!email || !password)
			return res.status(400).send("Please provide all required fields");

		const user = await checkUserCredentialsAndReturnUserSvc(email, password);

		if (user === false)
			return res.status(500).send("Please check your credentials");

		const token = jwt.sign(user, process.env.JWT_TOKEN_SECRET, {
			expiresIn: "1h",
		});

		return res.status(200).send({
			message: "User Logged in Successfully",
			accessToken: token,
			refreshToken: user.refreshToken,
		});
	} catch (error) {
		logger.error(error);
		return res.status(500).send("Error logging in user");
	}
}

export async function getAccessTokenFromRefreshTokenController(
	req: Request,
	res: Response
): Promise<any> {
	try {
		const refreshToken: string = req.body.refreshToken;
		const userFromRefreshToken = await jwt.verify(
			req.body.refreshToken,
			process.env.JWT_TOKEN_SECRET
		);
		const user = await validateRefreshTokenAndReturnUserSvc(
			refreshToken,
			userFromRefreshToken.id
		);

		if (user === false)
			return res.status(500).send("Please check your credentials");

		const token = jwt.sign(user, process.env.JWT_TOKEN_SECRET, {
			expiresIn: "1h",
		});

		return res.status(200).send({
			message: "New Access Token Generated",
			accessToken: token,
			refreshToken: refreshToken,
		});
	} catch (error) {
		logger.error(error);
		return res.status(500).send("Error logging in user");
	}
}

export async function logoutUserController(
	req: Request,
	res: Response
): Promise<any> {
	try {
		const refreshToken = req.headers["refresh-token"].toString();
		const token = refreshToken && refreshToken.split(" ")[1];
		// To clean any line breaks , due to postman sending the token with line breaks
		const tokenClean = token.replace(/(\r\n|\n|\r)/gm, "");
		const user: boolean = await logoutUserWithRefreshTokenSvc(tokenClean);

		if (!user) return res.status(500).send("Please check your credentials");

		return res.status(200).send({
			message: "User Logged out Successfully",
		});
	} catch (error) {
		logger.error(error);
		return res.status(500).send("Error logging out user");
	}
}
export async function makeAdminController(
	req: Request,
	res: Response
): Promise<any> {
	try {
		const userId = req.body.userEmail;
		const user = await makeAdminSvc(userId);
		if (!user) return res.status(500).send("Error making user admin");
		return res.status(200).send({ message: "User made admin successfully" });
	} catch (err) {
		logger.error(err);
		return res.status(500).send("Error making user admin");
	}
}
