import { load } from "ts-dotenv";

let path: string;

switch (process.env.NODE_ENV) {
  case "development":
    path = `${__dirname}/.env.development`;
    break;
  case "production":
    path = `${__dirname}/.env.production`;
    break;
  default:
    path = `${__dirname}/.env.production`;
}

export default load({
  APP_NAME: String,
  PORT: Number,
  HOST: String,
  TOKEN: String,
  CORS_URL: String,
  DB_PORT: Number,
  DB_HOST: String,
  DB_NAME: String,
  DB_USER: String,
  DB_PASS: String,
  NODE_ENV: [
    "production" as const,
    "development" as const,
  ],
}, path);
