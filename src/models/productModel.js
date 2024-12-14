const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
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
      type: String,
      default: 0,
    },
  },

  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;
