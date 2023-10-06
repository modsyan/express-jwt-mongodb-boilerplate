import { IProduct, IUser } from "./types";

export interface GetAllUsersRequest {}

export interface GetAllUserResponse {
  success: boolean;
  data: {
    length: number;
    users: IUser[];
  };
}

export interface GetUsersRequest {}

export interface GetUserResponse {
  success: boolean;
  data: {
    user: IUser;
  };
}

export interface LoginUserRequest {
  usernameOrEmail: string;
  password: string;
}

export interface LoginUserResponse {
  jwt: string;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  birthDate: Date;
  role: string;
}
export interface CreateUserResponse {
  success: boolean,
  data: {

  message: string,
  user: IUser
  }
}

export interface UpdateUserRequest {}
export interface UpdateUserResponse {}

export interface DeleteUserRequest {}
export interface DeleteUserResponse {
  success: boolean;
  message: string;
  deletedUser: IUser;
}