// Rename file to config.ts
// Env variables
export const NODE_ENV: string = process.env.NODE_ENV || "development";
export const HOST: string = process.env.HOST || "127.0.0.1";
export const PORT: number = parseInt(process.env.PORT || "3000");
export const TOKEN: string =
  process.env.ACCESS_TOKEN_SECRET || "token_example_key";
export const DB_HOST: string = process.env.DB_HOST || "localhost";
export const DB_PORT: string = process.env.DB_PORT || "3306";
export const DB_NAME: string = process.env.DB_NAME || "database";
export const DB_USER: string = process.env.DB_USER || "root";
export const DB_PASS: string = process.env.DB_PASS || "password";
