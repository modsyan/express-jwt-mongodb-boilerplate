import mongoose, { Model, model } from "mongoose";
import validator from "validator";
import { IUser } from "../shared/types/types";

interface IUserMethods{}
type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      require: [true, "Missing Name of the User"],
      trim: true,
    },

    lastName: {
      type: String,
      require: [true, "Missing Name of the User"],
      trim: true,
    },

    userName: {
      type: String,
      require: [true, "Missing Name of the User"],
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      require: [true, "Missing Email of the User"],
      trim: true,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Wrong Password Format"],
    },

    phoneNumber: {
      type: String,
      require: [true, "Missing phoneNumber"],
      unique: true,
    },

    birthDate: {
      type: Date,
      // TODO
      // min: Date.now(), // grater than 10 years
      // max: Date.now(), // less than 100 years
    },

    password: {
      type: String,
      required: [true, "Missing Password"],
      minlength: [8, "minimum of letter is 8"],
    },

    Orders: [{ type: mongoose.Types.ObjectId, ref: "PRODUCT" }],
    address: [{ type: mongoose.Types.ObjectId, ref: "ADDRESS" }],
    wishList: [{ type: mongoose.Types.ObjectId, ref: "PRODUCT" }],

    role: {
      type: String,
      enum: {values: ["admin", "buyer", "seller", "operation"], message: "user role is required"},
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

export const User = model<IUser, UserModel >("USER", userSchema);
