import { userRegister } from "types/users";
import { Request, Response } from "express";
import { registerNewUserSvc } from "../services/user-svc";

export async function registerNewUserController(req: Request, res: Response): any {
	try{
	const { name, email, password } = req.body.userData;

	//todo validate user data before creating user

	if (!name || !email || !password)
		return res.status(400).send("Please provide all required fields");

	const user: userRegister = {
		name,
		email,
		password,
	};

	const newUser =await  registerNewUserSvc(user);


	if (!newUser) return res.status(500).send("Error creating user");

	return res
		.status(200)
		.send({ message: "User Created Successfully", id: newUser.id });
} catch (error) {
	console.log(error);
	return res.status(500).send("Error creating user");
}
