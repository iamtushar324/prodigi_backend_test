import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface WishListAttributes {
	id: number;
	productId: number;
	userId: number;
	createdAt?: Date;
	updatedAt?: Date;
}
export interface WishListModel
	extends Model<WishListAttributes>,
		WishListAttributes {}
export class WishList extends Model<WishListModel, WishListAttributes> {}

export type WishListStatic = typeof Model & {
	new (values?: object, options?: BuildOptions): WishList;
};

export function ProductFactory(sequelize: Sequelize) {
	return <WishListStatic>sequelize.define("wishlists", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		productId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		userId: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
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
