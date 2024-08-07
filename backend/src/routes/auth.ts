import { Hono } from "hono";
import { Signin } from "../controllers/auth";

const auth = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

auth.post("/signin", Signin);

export default auth;
