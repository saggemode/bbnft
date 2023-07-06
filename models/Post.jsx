import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    category: { type: String, required: true },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/next-ecom-tailwind/image/upload/v1657790655/cemkt3z4fefvnpxvnvzk.png",
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    //author: { type: Object, required: true },
    //published:{ type: String, required: true },
    description: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userImage: { type: String, required: true },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
