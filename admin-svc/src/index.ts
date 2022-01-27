import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { db } from "./db";

const app = express();

const PORT = process.env.port;

if (PORT === undefined) {
	console.error("Please Provide .env file with PORT");
	process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

db.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is listening at http://localhost:${PORT}`);
	});
});
