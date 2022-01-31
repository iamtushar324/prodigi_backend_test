import { Sequelize } from "sequelize";
import { ProductFactory, ProductStatic } from "./models/products";

export interface DB {
	sequelize: Sequelize;
	Products: ProductStatic;
}

const dbInstance = new Sequelize({
	dialect: "mysql",
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	username: process.env.DB_USER_NAME,
	password: process.env.DB_USER_PASSWORD,
});

const Products = ProductFactory(dbInstance);

export const db: DB = {
	sequelize: dbInstance,
	Products,
};
