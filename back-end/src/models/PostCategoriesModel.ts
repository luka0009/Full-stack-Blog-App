import mongoose, { Schema } from "mongoose";

const postCategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const PostCategories = mongoose.model("PostCategories", postCategoriesSchema);
export default PostCategories;
