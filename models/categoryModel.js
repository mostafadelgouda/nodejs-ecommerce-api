const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name required"],
      unique: [true, "Category name must be unique"],
      trim: true,
      minlength: [3, "Category name is too short"],
      maxlength: [32, "Category name is too long"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
