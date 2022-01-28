import { productDetails } from "types/products";
import { Request, Response } from "express";

export function getAllProducts(req: Request, res: Response) {}

export async function createNewProduct(
	req: Request,
	res: Response
): Promise<any> {
	try {
		const productData: productDetails = req.body.productData;
		const newProduct = await createNewProduct(req.body.productData);
		if (!newUser) return res.status(500).send("Error creating user");
		return res
			.status(200)
			.send({ message: "User Created Successfully", id: newUser.id });
	} catch (error) {
		console.log(error);
		return res.status(500).send("Error creating user");
	}
}
