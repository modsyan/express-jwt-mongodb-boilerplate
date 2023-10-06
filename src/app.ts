import express, { RequestHandler } from "express";
// import morgan from 'morgan';
import cors from "cors";
import { EndPoints, ENDPOINT_CONFIGS } from "./shared/types/endpoints";
import { UserController } from "./api/controllers/userController";

import {
  enforceJwtMiddleWare,
  jwtParserMiddleware,
} from "./middlewares/authMiddleware";
import asyncHandler from "express-async-handler";
// import { LOGGER } from "./utils/logger";
import { errorHandler } from "./middlewares/errorMiddleware";
// import { AuthController } from "./controllers/authController";


export async function createApp(logRequest = true) {

  // if(process.env.NODE_ENV === "development") {
  //   app.use(morgan('dev'));
  // }
  // app.use(express.static(`${__dirname}/public`));

  const app = express();
  app.use(express.json());
  app.use(cors());
  if (logRequest) {
    // app.use();
  }

  // Controllers Objects
  const userController = new UserController();
  const productController = new ProductController();

  // map endpoint to controllers
  const CONTROLLERS: { [key in EndPoints]: RequestHandler<any, any> } = {
    [EndPoints.healthz]: (_, res) => res.send({ status: "ok" }),

    // user
    [EndPoints.getUser]: userController.get,
    [EndPoints.deleteUser]: userController.delete,
    [EndPoints.updateUser]: userController.update,
    [EndPoints.login]: userController.login,
    [EndPoints.register]: userController.register,

    //currentUser
    [EndPoints.getCurrentUser]: userController.getCurrent,
    [EndPoints.updateCurrentUser]: userController.updateCurrent,
    [EndPoints.deleteCurrentUser]: userController.deleteCurrent,

    // allUsers
    [EndPoints.getAllUsers]: userController.getAll,
    [EndPoints.updateAllUsers]: userController.UpdateAll, 

    //products
    [EndPoints.getProduct]: productController.getById,
    [EndPoints.getAllProducts]: productController.getAll,
    [EndPoints.createManyProducts]: productController.createMany,
    [EndPoints.createProduct]: productController.create,
    [EndPoints.updateProduct]: productController.update,
    [EndPoints.deleteProduct]: productController.deleteById,
  };

  Object.keys(EndPoints).forEach((endpointKey) => {
    const endpoint = EndPoints[endpointKey as keyof typeof EndPoints];
    const endPointConfig = ENDPOINT_CONFIGS[endpoint];
    const controller = CONTROLLERS[endpoint];
    const requiresAuth = endPointConfig.auth ?? false;

    if (requiresAuth) {
      app[endPointConfig.method](
        endPointConfig.url,
        jwtParserMiddleware,
        enforceJwtMiddleWare,
        asyncHandler(controller)
      );
    } else {
      app[endPointConfig.method](
        endPointConfig.url,
        // jwtParserMiddleware,
        asyncHandler(controller)
      );
    }
  });
  app.use(errorHandler);
  return app;
}
