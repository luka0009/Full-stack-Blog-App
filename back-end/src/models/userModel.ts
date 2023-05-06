import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      required: false,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  }
  return next();
});

userSchema.methods.generateJWT = async function () {
  return await sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
} 

interface IUser extends Document {
  avatar: string;
  name: string;
  email: string;
  password: string;
  verified: boolean;
  admin: boolean;
  verificationCode?: string;
  generateJWT(): Promise<string>;
  comparePassword(password: string): Promise<boolean>;
}

interface IUserModel extends mongoose.Model<IUser> {}

const User = mongoose.model<IUser, IUserModel>("User", userSchema);
export default User;
