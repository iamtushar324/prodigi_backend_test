import { productDetails } from "types/products";
import { kafkaProducer } from "../helpers/kafkaInit";

export async function createNewProductSvc(
	product: productDetails
): Promise<any> {
	const string = await JSON.stringify(product);
	console.log(`${string}`);
	await kafkaProducer.send(
		[
			{
				topic: "create-product",
				messages: string,
			},
		],
		(err, data) => {
			console.log(data);
			if (err) {
				console.error(err);
				return false;
			}
			return true;
		}
	);
	return true;
}
