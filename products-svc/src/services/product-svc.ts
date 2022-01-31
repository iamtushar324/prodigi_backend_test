import { productDetails, searchKeywords } from "types/products";
import { db } from "../db";
import { Op } from "sequelize";

export async function createNewProductSvc(
	product: productDetails
): Promise<any> {
	return await db.Products.create(product);
}

export async function getProductsBySearchSvc(
	searchKeywords: searchKeywords
): Promise<any> {
	const { searchKeyword, type, brand, price, discount } = searchKeywords;
	// get products with title similar to searchKeyword if searchKeyword is not empty
	const products = await db.Products.findAll({
		where: {
			title: {
				[Op.like]: searchKeyword ? `%${searchKeyword}%` : "%",
			},
			type: {
				[Op.like]: type ? `%${type}%` : "%",
			},
			brand: {
				[Op.like]: brand ? `%${brand}%` : "%",
			},
			price: {
				[Op.like]: price ? `%${price}%` : "%",
			},
			discount: {
				[Op.like]: discount ? `%${discount}%` : "%",
			},
		},
		attributes: [
			"id",
			"title",
			"description",
			"brand",
			"type",
			"price",
			"discount",
			"thumbnail",
		],
	});

	return products;
}

export async function getAllProductsSvc(pageNumber): Promise<any> {
	const limit = 10;
	return await db.Products.findAll({
		offset: pageNumber * limit,
		limit: limit,
		attributes: [
			"id",
			"title",
			"description",
			"brand",
			"type",
			"price",
			"discount",
			"thumbnail",
		],
	});
}
