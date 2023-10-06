declare global {
  namespace NodeJs {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT: number;
      DATABASE_REMOTE_DEVELOPMENT: string;
      DATABASE_REMOTE_PRODUCTION: string;
      DATABASE_LOCAL_DEVELOPMENT: string;
      JWT_SECRET: string;
    }
  }
}

export {};
