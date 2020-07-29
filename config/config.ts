// Env variables
export const HOST: string = process.env.HOST || "0.0.0.0";
export const PORT: number = parseInt(process.env.PORT || "3000");
export const TOKEN: string =
  process.env.ACCESS_TOKEN_SECRET || "3P5DEkDn8yz0H9IgVU22";
export const DB_HOST: string = process.env.DB_HOST || "localhost";
export const DB_PORT: string = process.env.DB_PORT || "3306";
export const DB_NAME: string = process.env.DB_NAME || "groupomania";
export const DB_USER: string = process.env.DB_USER || "root";
export const DB_PASS: string = process.env.DB_PASS || "824688Ygg";
