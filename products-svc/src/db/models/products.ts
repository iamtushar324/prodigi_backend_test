import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface ProductAttributes {
	id: number;
	title: string;
	description: string;
	brand: string;
	type: string;
	price: number;
	discount: number;
	active: boolean;
	thumbnail: string;
	viewCount: number;
	isDeleted: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}
export interface ProductModel
	extends Model<ProductAttributes>,
		ProductAttributes {}
export class Product extends Model<ProductModel, ProductAttributes> {}

export type ProductStatic = typeof Model & {
	new (values?: object, options?: BuildOptions): Product;
};

export function ProductFactory(sequelize: Sequelize) {
	return <ProductStatic>sequelize.define("products", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		brand: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		discount: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		active: {
			type: DataTypes.BOOLEAN,
			defaultValue: 1,
		},
		isDeleted: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		viewCount: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		thumbnail: {
			type: DataTypes.STRING,
			defaultValue: "",
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
