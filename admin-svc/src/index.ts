import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { db } from "./db";
import kafkaInit from "./helpers/kafkaInit";
import apiRouter from "./routes";

const app = express();

const PORT = process.env.port;

if (PORT === undefined) {
	console.error("Please Provide .env file with PORT");
	process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "*" }));

app.use("/api", apiRouter);

app.get("/*", (req: Request, res: Response) => {
	res.status(404).send("Not Found");
});

db.sync().then(() => {
	const KafkaProducer = kafkaInit();
	KafkaProducer.on("ready", () => {
		console.log("Kafka Producer is ready");
		app.listen(PORT, () => {
			console.log(`Server is listening at http://localhost:${PORT}`);
		});
	});
});
