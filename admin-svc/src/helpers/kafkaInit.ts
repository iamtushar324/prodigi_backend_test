import kafka from "kafka-node";

export let kafkaProducer = null;

//Kafka setup
export default function kafkaInit() {
	const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
	const Producer = new kafka.Producer(client);
	kafkaProducer = Producer;
	Producer.on("error", (err) => {
		process.exit(1);
	});
	return Producer;
}
