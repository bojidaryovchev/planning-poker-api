declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'production';
        PORT: string;
        CORS_ORIGIN: string;
        DATABASE_URL: string;
        ACCESS_TOKEN_SECRET: string;
        REFRESH_TOKEN_SECRET: string;
        REFRESH_TOKEN_SEAL_SECRET: string;
        USER_ID_SEAL_SECRET: string;
      }
    }
  }
}
