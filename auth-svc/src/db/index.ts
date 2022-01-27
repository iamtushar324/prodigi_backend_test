const Sequelize = require("sequelize");

export const db = new Sequelize({
	dialect: "mysql",
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	username: process.env.DB_USER_NAME,
	password: process.env.DB_USER_PASSWORD,
});
