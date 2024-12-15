import mongoose, { Schema, Document, Model } from "mongoose";

// Define the Subcategory interface
export interface ISubcategory extends Document {
  name: string;
  slug?: string; // Optional field
  category: mongoose.Types.ObjectId; // Reference to the parent category
}

// Define the Subcategory schema
const subCategorySchema: Schema<ISubcategory> = new Schema<ISubcategory>(
  {
    name: {
      type: String,
      required: [true, "Subcategory name is required"],
      trim: true,
      unique: true, // Explicitly set as a boolean
      minlength: [3, "Subcategory name is too short"],
      maxlength: [32, "Subcategory name is too long"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Correct reference to the "Category" model
      required: [true, "Subcategory must belong to a parent category"],
    },
  },
  { timestamps: true }
);

// Create and export the Subcategory model
const SubcategoryModel: Model<ISubcategory> = mongoose.model<ISubcategory>(
  "Subcategory",
  subCategorySchema
);

export default SubcategoryModel;
