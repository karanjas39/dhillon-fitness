import { Hono } from "hono";
import {
  AdminDetails,
  ChangePassword,
  UpdateAdmin,
} from "../controllers/admin";

const admin = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    adminId: string;
  };
}>();

admin.patch("/update/password", ChangePassword);
admin.patch("/update", UpdateAdmin);
admin.get("/me", AdminDetails);

export default admin;
