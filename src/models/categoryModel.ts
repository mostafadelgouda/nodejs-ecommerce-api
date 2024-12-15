import mongoose, {Schema, Model} from"mongoose";

export interface ICategory extends Document{
  name: string;
  slug: string;
  image?: string;
}

const categorySchema: Schema<ICategory> = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category name required"],
      unique: true,
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
const CategoryModel: Model<ICategory> = mongoose.model<ICategory>("Category", categorySchema);

export default CategoryModel;
