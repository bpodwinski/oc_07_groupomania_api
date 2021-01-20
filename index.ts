import * as dotenv from "dotenv";

// init dotenv
dotenv.config();
let path;

switch (process.env.NODE_ENV) {
  case "development":
    path = `${__dirname}/utils/.env.development`;
    break;
  case "production":
    path = `${__dirname}/utils/.env.production`;
    break;
  default:
    path = `${__dirname}/utils/.env.development`;
}

dotenv.config({ path: path });

// start server
require("./server");
