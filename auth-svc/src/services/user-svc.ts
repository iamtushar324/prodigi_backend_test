import { userRegister } from "types/users";
import { db } from "../db";
import jwt from "jsonwebtoken";
import { logger } from "../helpers";

export function registerNewUserSvc(user: userRegister): any {
	return db.User.create(user);
}

export async function checkUserCredentialsAndReturnUserSvc(
	email: string,
	password: string
): Promise<any> {
	const user = await db.User.findOne({
		where: {
			email,
			password,
		},
		attributes: ["id", "email", "role", "password", "name"],
	});
	if (user.email == email && user.password == password) {
		const userDetails = {
			id: user.id,
			email: user.email,
			name: user.name,
			refreshToken: null,
			role: user.role,
		};
		const refreshToken = await jwt.sign(
			userDetails,
			process.env.JWT_TOKEN_SECRET
		);
		userDetails.refreshToken = refreshToken;

		//Update refresh token to the user table
		await db.User.update(
			{
				refreshToken,
			},
			{
				where: {
					id: user.id,
				},
			}
		);
		return userDetails;
	} else return false;
}

export async function validateRefreshTokenAndReturnUserSvc(
	refreshToken: string,
	userId: string
) {
	const user = await db.User.findByPk(userId);

	if (user.refreshToken == refreshToken) {
		return { id: user.id, email: user.email, name: user.name, role: user.role };
	} else {
		return false;
	}
}
export async function logoutUserWithRefreshTokenSvc(refreshToken: string) {
	try {
		const userFromToken = await jwt.verify(
			refreshToken,
			process.env.JWT_TOKEN_SECRET as string
		);
		const user = await db.User.update(
			{ refreshToken: null },
			{
				where: {
					id: userFromToken.id,
				},
			}
		);
		return true;
	} catch (error) {
		logger.error(error);
		return false;
	}
}

export async function makeAdminSvc(userEmail: string) {
	const arr = await db.User.update(
		{ role: "admin" },
		{
			where: {
				email: userEmail,
			},
		}
	);
	if (arr[0] == 0) return false;
	return true;
}
