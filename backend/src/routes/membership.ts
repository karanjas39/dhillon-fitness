import { Hono } from "hono";
import { CreateMembership } from "../controllers/membership";

const membership = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

membership.post("/create", CreateMembership);

export default membership;
