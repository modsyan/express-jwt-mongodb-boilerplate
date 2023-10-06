import { IUser } from "@bazar/shared/types/types";
import {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  GetAllUserResponse,
  GetAllUsersRequest,
  GetUserResponse,
  GetUsersRequest,
  LoginUserRequest,
  LoginUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from "../../../shared/types/api";
import ApiError, { BadRequestError, NotFoundError } from "../models/api-error.model";
import { ExpressHandler, ExpressHandlersWithParams } from "../extensions/api.extension";
import { User } from "../entities/user.model";
import crypto from "crypto";
import { getPasswordSalt } from "../../environment/env";
import { signJwt } from "../helpers/auth.helper";
// import { IUser } from "@bazar/shared/types/types";
// import { BadRequestError } from "../helpers/appError";

export class UserController {
  constructor() {}

  public get: ExpressHandlersWithParams<
    { userId: string },
    GetUsersRequest,
    GetUserResponse
  > = async (req, res, _next) => {
    const userId = req.params.userId;
    const user: IUser | null = await User.findById(userId);
    if (!user) throw new NotFoundError(`user with ${userId} not found`);
    return res.status(200).send({
      success: true,
      data: {
        user: user,
      },
    });
  };

  public login: ExpressHandler<LoginUserRequest, LoginUserResponse> = async (
    req,
    res,
    _next
  ) => {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password)
      throw new BadRequestError("username or password is missing");

    let user: IUser | null;

    try {
      user =
        (await User.findOne({ userName: usernameOrEmail })) ||
        (await User.findOne({ email: usernameOrEmail }));
    } catch (error: any) {
      throw new Error(error);
    }

    if (!user) {
      throw new NotFoundError("Username or Email not found");
    }

    if (user.password !== this._hashPassword(password))
      throw new NotFoundError();

    const jwt = signJwt({ userId: user._id.toString()});


  };

  public register: ExpressHandler<CreateUserRequest, CreateUserResponse> =
    async (req, res, _next) => {
      const {
        firstName,
        lastName,
        username,
        email,
        phoneNumber,
        password,
        birthDate,
        role,
      } = req.body;
      if (
        !firstName ||
        !lastName ||
        !username ||
        !email ||
        !phoneNumber ||
        !password ||
        !birthDate ||
        !role
      ) {
        //todo
        // needed to create Better Error Function to Send Missing Properties
        // const objectToSend =
        //   `firstName: ${firstName}` +
        //   `lastName: ${lastName}` +
        //   `username: ${username}` +
        //   `email: ${email}` +
        //   `phoneNumber: ${phoneNumber}` +
        //   `password: ${password}` +
        //   `birthDate: ${birthDate}` +
        //   `role: ${role}`;
        //
        throw new BadRequestError(
          `missing one of the properties\n may be the following are missing: ${req.body}`
        );
      }
      // check if the phone number or the username in duplicated
      const isDuplicatedUserName = await User.findOne({ userName: username });
      const isDuplicatedEmail = await User.findOne({ email: email });
      if (isDuplicatedEmail) {
        throw new BadRequestError("Email is already used, try another one");
      }
      if (isDuplicatedUserName) {
        throw new BadRequestError("Username is already used, try another one");
      }
      const user: Partial<IUser> = {
        firstName: firstName,
        lastName: lastName,
        userName: username,
        password: this._hashPassword(password),
        email: email,
        phoneNumber: phoneNumber,
        birthDate: birthDate,
        role: "Buyer",
      };

      let userCreated: IUser | null;

      try {
        userCreated = await User.create(user);
      } catch (error: any) {
        throw new ApiError(500, "Unhandled error accrued", error);
      }
      res.status(200).send({
        success: true,
        data: {
          message: "successful user created",
          user: userCreated,
        },
      });
    };

  public update: ExpressHandlersWithParams<
    { userId: string },
    UpdateUserRequest,
    UpdateUserResponse
  > = async (_req, _res, _) => {
    // const userId = req.params.userId; {
    //   if
  };

  public delete: ExpressHandlersWithParams<
    { userId: string },
    DeleteUserRequest,
    DeleteUserResponse
  > = async (req, res, _next) => {
    const userId = req.params.userId;
    if (!userId) {
      throw new BadRequestError("UserId of the user to delete missing");
    }
    let deletedUser: IUser | null;

    try {
      deletedUser = await User.findByIdAndDelete(userId);
    } catch (error: any) {
      throw new ApiError(404, "Unhandled Error", error);
    }

    if (!deletedUser) {
      throw new NotFoundError(`user with id: ${userId} not found`);
    }

    res.status(200).send({
      success: true,
      message: "User Is Successfully deleted",
      deletedUser: deletedUser!,
    });
  };

  public getCurrent: ExpressHandler<GetUsersRequest, GetUserResponse> = async (
    _req,
    _res,
    _next
  ) => {};

  public updateCurrent: ExpressHandler<UpdateUserRequest, UpdateUserResponse> =
    async (_req, _res, _next) => {};

  public deleteCurrent: ExpressHandler<DeleteUserRequest, DeleteUserResponse> =
    async (_req, _res, _next) => {};

  public getAll: ExpressHandler<GetAllUsersRequest, GetAllUserResponse> =
    async (_req, res, _next) => {
      const users: IUser[] = await User.find();
      res.send({
        success: true,
        data: {
          length: users.length,
          users: users,
        },
      });
    };

  public UpdateAll: ExpressHandler<UpdateUserRequest, UpdateUserResponse> =
    async (_req, _res, _next) => {};

  private _hashPassword(password: string): string {
    const salt: string = getPasswordSalt();
    const hashingAlgorithm = "sha512";
    const keyLength = 64;
    const iterations = 64;
    return crypto
      .pbkdf2Sync(password, salt, iterations, keyLength, hashingAlgorithm)
      .toString("hex");
  }
}
