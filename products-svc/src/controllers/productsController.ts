import { productDetails, searchKeywords } from "types/products";
import { Request, Response } from "express";
import {
	createNewProductSvc,
	getAllProductsSvc,
	getProductsBySearchSvc,
} from "../services/productSvc";
import { logger } from "../helpers";

export async function getAllProducts(
	req: Request,
	res: Response
): Promise<any> {
	try {
		const pageNumber: any = req.query.pageNumber;
		const products = await getAllProductsSvc(pageNumber);
		res.status(200).send({ products: products });
	} catch (err) {
		logger.error(err);
		res.status(500).send("Error while getting all products");
	}
}

export async function createNewProduct(
	req: Request,
	res: Response
): Promise<any> {
	try {
		console.log(res.locals.user);
		const productData: productDetails = req.body.productData;
		//Todo validate product data before creating product

		const newProduct = await createNewProductSvc(productData);
		if (!newProduct) return res.status(500).send("Error creating user");
		return res
			.status(200)
			.send({ message: "Product Created Successfully", id: newProduct.id });
	} catch (error) {
		logger.error(error);
		return res.status(500).send("Error creating Product");
	}
}

export async function getProductsBySearch(
	req: Request,
	res: Response
): Promise<any> {
	try {
		const searchKeywords: searchKeywords = {
			searchKeyword: req.query.searchKeyword,
			type: req.query.type,
			brand: req.query.brand,
			price: req.query.price,
			discount: req.query.discount,
		};
		const product = await getProductsBySearchSvc(searchKeywords);
		if (!product) return res.status(404).send("Product not found");
		return res.status(200).send(product);
	} catch (error) {
		logger.error(error);
		return res.status(500).send("Error getting product");
	}
}
