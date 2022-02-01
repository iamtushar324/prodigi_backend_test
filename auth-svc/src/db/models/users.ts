import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface UserAttributes {
	id: number;
	name: string;
	email: string;
	password: string;
	refreshToken: string;
	role: string;
	createdAt?: Date;
	updatedAt?: Date;
}
export interface UserModel extends Model<UserAttributes>, UserAttributes {}
export class User extends Model<UserModel, UserAttributes> {}

export type UserStatic = typeof Model & {
	new (values?: object, options?: BuildOptions): UserModel;
};

export function UserFactory(sequelize: Sequelize) {
	return <UserStatic>sequelize.define("users", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			defaultValue: "",
		},
		refreshToken: {
			type: DataTypes.STRING,
			defaultValue: false,
		},
		role: {
			type: DataTypes.STRING,
			defaultValue: "user",
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	});
}
