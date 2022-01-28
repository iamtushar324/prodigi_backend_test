import { userRegister } from "types/users";
import { db } from "../db";

export function registerNewUserSvc(user: userRegister): any {
	return db.User.create(user);
}
