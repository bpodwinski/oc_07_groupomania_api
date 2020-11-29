import { EnvType, load } from "ts-dotenv";
export type Env = EnvType<typeof schema>;
export let env: Env;

let path: string;

export const schema = {
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
  DB_PREFIX: String,
};

// select the good env config file based on env environment process
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

export function initEnv(): void {
  env = load(schema, path);

  if (env.DB_PREFIX) {
    env.DB_PREFIX = env.DB_PREFIX + "_";
  }
}
