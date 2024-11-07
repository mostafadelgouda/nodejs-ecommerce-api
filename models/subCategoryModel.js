const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subcategory name required"],
      trim: true,
      unique: [true, "Subcategory must me unique"],
      minlength: [3, "Subcategory name is too short"],
      maxlength: [32, "Subcategory name is too long"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
      required: [true, "Subcategory must be belong to parent category"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("SubCategory", subCategorySchema);
