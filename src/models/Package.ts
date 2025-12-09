import mongoose, { Schema, Document } from "mongoose";

export interface IPackage extends Document {
  packageName: string;
  slug: string;
  description: string;
  image: string;
  imagePublicId: string;
  indianPrice: number;
  foreignPrice: number;
  maxAdults: number;
  maxChildren: number;
  amenities: string[];
  availability: boolean;
  category?: string;
  isActive: boolean;
}

const PackageSchema = new Schema<IPackage>(
  {
    packageName: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    // Cloudinary image URL
    image: {
      type: String,
      required: true,
    },

    // Cloudinary public ID (used for deleting/updating)
    imagePublicId: {
      type: String,
      required: true,
    },

    indianPrice: {
      type: Number,
      required: true,
    },

    foreignPrice: {
      type: Number,
      required: true,
    },

    maxAdults: {
      type: Number,
      required: true,
    },

    maxChildren: {
      type: Number,
      required: true,
    },

    amenities: {
      type: [String],
      default: [],
    },

    availability: {
      type: Boolean,
      default: true,
    },

    category: {
      type: String,
      enum: ["Adventure", "Family", "Luxury", "Budget", "Honeymoon", "General"],
      default: "General",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Create SEO-friendly slug automatically
PackageSchema.pre("save", function (next) {
  if (this.isModified("packageName")) {
    this.slug = this.packageName.toLowerCase().trim().replace(/\s+/g, "-");
  }
  next();
});

export default mongoose.models.Package ||
  mongoose.model<IPackage>("Package", PackageSchema);
