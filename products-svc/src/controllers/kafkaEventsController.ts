import { logger } from "../helpers";
import { createNewProductSvc } from "../services/productSvc";

export default async function kafkaEventsController(event) {
	console.log(event.topic);
	if (event.topic == "test") {
		console.log(event.value);
	}
	if (event.topic == "create-product") {
		try {
			const objFromString = JSON.parse(event.value);
			const product = await createNewProductSvc(objFromString);
			if (product?.id) return true;
			else
				throw new Error(
					"Error creating product from event value :- " + event.value
				);
		} catch (err) {
			logger.error(
				`Error creating product  from event value :- ${JSON.stringify(
					event.value
				)}`
			);
			process.exit(1);
		}
		console.log(event.value);
	}
}
