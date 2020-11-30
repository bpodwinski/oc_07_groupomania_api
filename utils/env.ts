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
  REDIS_HOST: String,
  REDIS_PORT: Number,
  REDIS_DB: {
    type: String,
    optional: true,
  },
  REDIS_PASS: {
    type: String,
    optional: true,
  },
  REDIS_PREFIX: {
    type: String,
    optional: true,
  },
  CACHE_TTL: Number,
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

  if (env.REDIS_PREFIX) {
    env.REDIS_PREFIX = env.REDIS_PREFIX + "_";
  }
}
