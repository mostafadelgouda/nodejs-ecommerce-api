import mongoose, {Schema, Model} from"mongoose";

export interface IBrand extends Document{
  name: string;
  slug?: string;
  image?: string;
}

const brandSchema: Schema<IBrand> = new Schema<IBrand>(
  {
    name: {
      type: String,
      required: [true, "Brand name required"],
      unique: true,
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
const BrandModel: Model<IBrand> = mongoose.model<IBrand>("Brand", brandSchema);

export default BrandModel;
