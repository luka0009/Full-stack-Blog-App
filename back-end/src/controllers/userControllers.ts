import express from "express";
import User from "../models/userModel";
import { uploadPicture } from "../middleware/uploadPicMiddleware";
import { fileRemover } from "../utils/fileRemover";

const registerUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("Please fill in all the fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("This email is already taken");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      _id: user.id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      token: await user.generateJWT(),
    });
    // return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email not found");
    }

    if (await user.comparePassword(password)) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
        token: await user.generateJWT(),
      });
    } else {
      throw new Error("Invalid Password");
    }
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (
  req: any,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    let user = await User.findById(req.user._id);
    if (user) {
      return res.status(201).json(user);
    } else {
      let error: any = new Error("User not found");
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (
  req: any,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) {
      throw new Error("User not found");
    }
    console.log(req.body);
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password && req.body.password.length < 6) {
      throw new Error("Password length must be at least 6 charachters");
    } else if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUserProfile: any = await user.save();
    res.status(201).json({
      _id: updatedUserProfile._id,
      avatar: updatedUserProfile.avatar,
      name: updatedUserProfile.name,
      email: updatedUserProfile.email,
      verified: updatedUserProfile.verified,
      admin: updatedUserProfile.admin,
      token: await updatedUserProfile.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

const updateProfilePicture = async (
  req: any,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const upload = uploadPicture.single('profilePicture');

    upload(req, res, async function(err) {
      if(err) {
        const error = new Error('An uknown error occured while uploading');
        next(error);
      } else {
        if (req.file) {
          let filename;
          let updatedUser = await User.findById(req.user._id);
          filename = updatedUser.avatar;
          if (filename) {
            fileRemover(filename);
          }
          updatedUser.avatar = req.file.filename;
          await updatedUser.save();
          res.json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            admin: updatedUser.admin,
            token: await updatedUser.generateJWT(),
          });
        } else {
          let filename;
          let updatedUser = await User.findById(req.user._id);
          filename = updatedUser.avatar;
          updatedUser.avatar = "";
          await updatedUser.save();
          fileRemover(filename);
          res.json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            admin: updatedUser.admin,
            token: await updatedUser.generateJWT(),
          });
        }
      }
    })

  } catch (error) {
    next(error);
    
  }
};

export { registerUser, loginUser, getUserProfile, updateUserProfile, updateProfilePicture };
