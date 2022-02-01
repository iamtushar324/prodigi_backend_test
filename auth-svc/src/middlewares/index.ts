import { Request, Response } from "express";
const jwt = require("jsonwebtoken");

export function authCheck(req: Request, res: Response, next: Function) {
	//check for jwt token auth
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) return res.sendStatus(401);

	jwt.verify(
		token,
		process.env.JWT_TOKEN_SECRET as string,
		(err: any, user: any) => {
			console.log(err);

			if (err) return res.sendStatus(403);

			res.locals.user = user;

			next();
		}
	);
}

export function superAdminAuthCheck(
	req: Request,
	res: Response,
	next: Function
) {
	//check for jwt
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) return res.sendStatus(401);

	jwt.verify(
		token,
		process.env.JWT_TOKEN_SECRET as string,
		(err: any, user: any) => {
			console.log(err);
			console.log(user);
			if (err) return res.sendStatus(403);
			if (user.email !== "iamtushar324@gmail.com") return res.sendStatus(403);

			res.locals.user = user;
			next();
		}
	);
}
