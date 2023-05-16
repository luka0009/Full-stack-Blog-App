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
    if (!post) {
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

export const updateComment = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { desc } = req.body;

    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      const error = new Error("Comment doesn't exist");
      return next(error);
    }

    comment.desc = desc || comment.desc;

    const updatedComment = await comment.save();
    return res.json(updatedComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    await Comment.deleteMany({ parent: comment._id });
    if (!comment) {
      const error = new Error("Comment doesn't exist");
      return next(error);
    }
    return res.json({ message: "Comment deleted" });
  } catch (error) {
    next(error);
  }
};
