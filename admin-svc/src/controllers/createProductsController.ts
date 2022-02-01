import { Request, Response } from "express";
import { productDetails } from "../types/products";
import { createNewProductSvc } from "../services/productsSvc";

export async function createNewProduct(
	req: Request,
	res: Response
): Promise<any> {
	try {
		console.log(res.locals.user);
		const productData: productDetails = req.body.productData;
		//Todo validate product data before creating product

		const newProduct: boolean = await createNewProductSvc(productData);
		if (!newProduct) return res.status(500).send("Error creating user");
		return res.status(200).send({ message: "Product Created Successfully" });
	} catch (error) {
		console.log(error);
		return res.status(500).send("Error creating Product");
	}
}
