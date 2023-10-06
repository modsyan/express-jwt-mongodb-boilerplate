import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  phoneNumber: string;
  birthDate: Date;
  address: string[];
  role: "Admin" | "Operation" | "Buyer" | "Seller";
  Orders: [];
  wishList: [];
  isBanned: boolean;
}
export interface IProduct {
  // userId: Schema.Types.ObjectId;
  title: string;
  description: string;
  images: string[];
  price: number;
  oldPrice: number;
  discount: number;
  category: string;
  quantity: number;

  sold: number;
  rate: number;
  feedback: Types.ObjectId[] | IReview[];
}

export interface IReview {
  name: string;
  rating: number;
  comment: string;
  user: IUser;
}
