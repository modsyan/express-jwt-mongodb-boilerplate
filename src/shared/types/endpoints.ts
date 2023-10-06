export type EndPointConfig = {
  url: string;
  method: "get" | "post" | "patch" | "delete";
  auth?: boolean | undefined;
  sensitive?: boolean;
};

export enum EndPoints {
  healthz = "healthz",

  login = "login",
  register = "register",

  getUser = "getUser",
  updateUser = "updateUser",
  deleteUser = "deleteUser",

  getCurrentUser = "getCurrentUser",
  updateCurrentUser = "updateCurrentUser",
  deleteCurrentUser = "deleteCurrentUser",

  getAllUsers = "getAllUsers",
  updateAllUsers = "updateAllUsers",


  getProduct = "getProduct",
  getAllProducts = "getAllProducts",

  createProduct = "createProduct",
  createManyProducts = "createManyProducts",

  updateProduct = "updateProduct",
  deleteProduct = "deleteProduct",
  

  // topRatedProducts = "topRatedProducts",
  // topSellers = "topSellers",
  // listProducts = "listProducts",
  // getWishList = "getWishList",
  // orders = "orders",
}

export const ENDPOINT_CONFIGS: { [key in EndPoints]: EndPointConfig } = {
  [EndPoints.healthz]: { method: "get", url: "/api/v1/healthz" },

  [EndPoints.login]: {
    method: "post",
    url: "/api/v1/login",
    sensitive: false,
    auth: false
  },

  [EndPoints.register]: {
    method: "post",
    url: "/api/v1/register",
    sensitive: false,
    auth: false
  },
  
  [EndPoints.getUser]: {
    url: "/api/v1/users/:userId",
    method: "get",
  },
  [EndPoints.getAllUsers]: {
    url: "/api/v1/users/",
    method: "get",
  },

  [EndPoints.updateAllUsers]: {
    url: "/api/v1/users/",
    method: "get",
  },

  [EndPoints.deleteUser]: {
    url: "/api/v1/users/:userId",
    method: "delete",
    auth: false,
    sensitive: false
  },

  [EndPoints.getCurrentUser]: {
    url: "/api/v1/me/",
    method: "get",
    auth: false,
    sensitive: false,
  },

  [EndPoints.updateCurrentUser]: {
    url: "/api/v1/me",
    method: "patch",
    auth: true,
  },

  [EndPoints.deleteCurrentUser]: {
    url: "/api/v1/me/",
    method: "delete",
    auth: true,
    sensitive: false 
  },


  [EndPoints.updateUser]: {
    url: "/api/v1/users",
    method: "patch",
    auth: true,
  },

  [EndPoints.getProduct]: {
    url: "/api/v1/products/:productId",
    method: "get",
  },

  [EndPoints.getAllProducts]: {
    url: "/api/v1/products/",
    method: "get",
    auth: false,
  },

  [EndPoints.createProduct]: {
    url: "/api/v1/products/",
    method: "post",
    auth: true,
  },

  [EndPoints.updateProduct]: {
    url: "/api/v1/products",
    method: "patch",
    auth: true,
  },

  [EndPoints.deleteProduct]: {
    url: "/api/v1/products/:productId",
    method: "delete",
    auth: true,
  },

  [EndPoints.createManyProducts]: {
    url: "/api/v1/products/all",
    method: "post",
    auth: true
  },
};
