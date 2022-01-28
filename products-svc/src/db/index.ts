import { Sequelize } from "sequelize";
import { UserFactory, UserStatic } from "./models/users";

export interface DB {
	sequelize: Sequelize;
	User: UserStatic;
}

const dbInstance = new Sequelize({
	dialect: "mysql",
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	username: process.env.DB_USER_NAME,
	password: process.env.DB_USER_PASSWORD,
});

const User = UserFactory(dbInstance);

export const db: DB = {
	sequelize: dbInstance,
	User,
};
