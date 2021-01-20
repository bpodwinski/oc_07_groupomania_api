import * as cors from "cors";

export default class Cors {
  public cors = cors({
    origin: process.env.CORS_URL,
    credentials: true,
    methods: "GET,PUT,POST,DELETE",
    allowedHeaders:
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  });
}
