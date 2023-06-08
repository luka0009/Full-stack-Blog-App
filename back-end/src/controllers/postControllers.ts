import express from "express";
import Post from "../models/postModel";
import Comment from "../models/commentModel";
import { uploadPicture } from "../middleware/uploadPicMiddleware";
import { fileRemover } from "../utils/fileRemover";
import { v4 as uuidv4 } from "uuid";

export const createPost = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { title, caption, tags, text } = req.body;
    const post = new Post({
      title: title || "sample title",
      caption: caption || "sample caption",
      tags: tags,
      slug: uuidv4(),
      body: {
        type: "doc",
        content: [
          {
            type: "text",
            text: text
          }
        ],
      },
      photo: "",
      //@ts-ignore
      user: req.user._id,
    });
    const createdPost = await post.save();
    return res.json(createdPost);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      const error = new Error("Post doesn't exits");
      next(error);
      return;
    }

    const upload = uploadPicture.single("postPicture");

    const handleUpdatePostData = async (data) => {
      const { title, caption, slug, body, tags, categories } = JSON.parse(data);
      post.title = title || post.title;
      post.caption = caption || post.caption;
      post.slug = slug || post.slug;
      post.body = body || post.body;
      post.tags = tags || post.tags;
      post.categories = categories || post.categories;
      const updatedPost = await post.save();
      return res.json(updatedPost);
    };

    upload(req, res, async function (err) {
      if (err) {
        const error = new Error("An uknown error occured while uploading");
        next(error);
      } else {
        if (req.file) {
          let filename;
          filename = post.photo;
          if (filename) {
            fileRemover(filename);
          }
          post.photo = req.file.filename;
          handleUpdatePostData(req.body.document);
        } else {
          let filename;
          filename = post.photo;
          post.photo = "";
          fileRemover(filename);
          handleUpdatePostData(req.body.document);
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug });
    if (!post) {
      const error = new Error("Post not found");
      return next(error);
    }
    await Comment.deleteMany({ post: post._id });
    return res.json({ message: "Post deleted succesfully" });
  } catch (error) {
    next(error);
  }
};

export const getPost = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate([
      {
        path: "user",
        select: ["avatar", "name"],
      },
      {
        path: "comments",
        match: {
          check: true,
          parent: null,
        },
        populate: [
          {
            path: "user",
            select: ["avatar", "name"],
          },
          {
            path: "replies",
            match: {
              check: true,
            },
            populate: [
              {
                path: "user",
                select: ["avatar", "name"],
              },
            ],
          },
        ],
      },
    ]);

    if (!post) {
      const error = new Error("Post doesn't exist");
      return next(error);
    }

    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const posts = await Post.find({}).populate([
      {
        path: "user",
        select: ["avatar", "name", "verified"],
      },
    ]);

    res.json(posts);
  } catch (error) {
    next(error);
  }
};
