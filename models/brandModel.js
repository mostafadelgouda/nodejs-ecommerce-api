const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand name required"],
      unique: [true, "Brand name must be unique"],
      trim: true,
      minlength: [3, "Brand name is too short"],
      maxlength: [32, "Brand name is too long"],
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
const BrandModel = mongoose.model("Brand", brandSchema);

module.exports = BrandModel;
