import { Hono } from "hono";

const membership = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    admin: boolean;
  };
}>();

export default membership;
