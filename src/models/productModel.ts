import mongoose, {Schema, Model} from"mongoose";
import {ICategory} from "./categoryModel"
import {IBrand} from "./brandModel"

export interface IProduct extends Document{
  title: string;
  slug: string;
  description: string;
  quantity: number;
  sold: number;
  price: number;
  priceAfterDiscount: number;
  colors: Array<string>;
  imageCover: string;
  category: mongoose.Types.ObjectId;
  subcategory: Array<mongoose.Types.ObjectId>;
  brand: mongoose.Types.ObjectId;
  ratingAverage: number;
  ratingQuantity: number;
}

const productSchema: Schema<IProduct> = new mongoose.Schema<IProduct>(
  {
    title: {
      type: "String",
      required: [true, "Product title is required"],
      minLength: [3, "Product title must be at least 3 characters"],
      trim: true,
      maxLength: [100, "Product title must be at most 100 characters"],
    },
    slug: {
      type: "String",
      required: [true, "Product slug is required"],
    },
    description: {
      type: "String",
      required: [true, "Product description is required"],
      minLength: [20, "Product description must be at least 3 characters"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
    },
    sold: { type: Number, default: 0 },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
      max: [1000000, "Product price must be at most 100000"],
    },
    priceAfterDiscount: { type: Number },
    colors: [String],
    imageCover: {
      type: String,
      required: [true, "Product Image Cover is required"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Product category is required"],
      ref: "Category",
    },
    subcategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Subcategory",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingAverage: {
      type: Number,
      min: [1.0, "Product rating average must be between 1.0 and 5.0"],
      max: [5.0, "Product rating average must be between 1.0 and 5.0"],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);

const ProductModel: Model<IProduct> = mongoose.model<IProduct>("Product", productSchema);
export default ProductModel;
