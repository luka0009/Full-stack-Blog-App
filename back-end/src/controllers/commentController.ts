import express from "express";
import Post from "../models/postModel";
import Comment from "../models/commentModel";

export const createComment = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { desc, slug, parent, replyOnUser } = req.body;

    const post = await Post.findOne({ slug: slug });
    if(!post) {
        const error = new Error("Post doesn't exist");
        return next(error);
    }
    const newComment = new Comment({
      //@ts-expect-error
      user: req.user._id,
      desc,
      post: post._id,
      parent,
      replyOnUser,
    });

    const savedComment = await newComment.save();
    return res.json(savedComment);
  } catch (error) {
    next(error);
  }
};
