import express from "express";
import User from "../models/userModel";

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
        if(user) {
            return res.status(201).json(user)
        } else {
            let error: any = new Error('User not found');
            error.statusCode = 404;
            next(error);
        }
    } catch (error) {
        next(error);
    }
};

export { registerUser, loginUser, getUserProfile };
