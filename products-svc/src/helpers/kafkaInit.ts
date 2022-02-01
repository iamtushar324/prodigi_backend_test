import kafka from "kafka-node";
import logger from "./winston";
import { kafkaEventsController } from "../controllers";

//Kafka setup
export default function kafkaInit() {
	const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
	const Consumer = new kafka.Consumer(
		client,
		[
			{ topic: "test", partition: 0 },
			{ topic: "create-product", partition: 0 },
		],
		{
			autoCommit: false,
		}
	);
	Consumer.on("error", (err) => {
		logger.error(err);
		process.exit(1);
	});

	Consumer.on("message", (message) => {
		logger.info(message);
		kafkaEventsController(message);
	});
}
