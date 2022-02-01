import { Request, Response } from "express";
const jwt = require("jsonwebtoken");

export function adminAuthCheck(req: Request, res: Response, next: Function) {
	//check for jwt token auth
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) return res.sendStatus(401);

	jwt.verify(
		token,
		process.env.JWT_TOKEN_SECRET as string,
		(err: any, user: any) => {
			if (user.role !== "admin") return res.sendStatus(403);

			if (err) return res.sendStatus(403);

			res.locals.user = user;

			next();
		}
	);
}
