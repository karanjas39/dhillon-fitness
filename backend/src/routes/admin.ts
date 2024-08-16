import { Hono } from "hono";
import {
  AdminDetails,
  ChangePassword,
  UpdateDailyTarget,
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
admin.patch("/update/daily-target", UpdateDailyTarget);
admin.get("/me", AdminDetails);

export default admin;
