import { Hono } from "hono";
import { ChangePassword } from "../controllers/admin";

const admin = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

admin.patch("/update/password", ChangePassword);

export default admin;
