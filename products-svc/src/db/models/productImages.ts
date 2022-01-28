import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface ProductImagesAttributes {
	id: number;
	productId: number;
	url: string;
	createdAt?: Date;
	updatedAt?: Date;
}
export interface ProductImagesModel
	extends Model<ProductImagesAttributes>,
		ProductImagesAttributes {}
export class ProductImage extends Model<
	ProductImagesAttributes,
	ProductImagesAttributes
> {}

export type ProductImageStatic = typeof Model & {
	new (values?: object, options?: BuildOptions): ProductImage;
};

export function ProductFactory(sequelize: Sequelize) {
	return <ProductImageStatic>sequelize.define("productImages", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		productId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		url: {
			type: DataTypes.STRING,
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
