import { Hono } from "hono";
import {
  GetDailySales,
  GetMembershipStats,
  GetTodaysBirthdayCount,
  GetYearlySales,
} from "../controllers/stats";

const stats = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    adminId: string;
  };
}>();

stats.get("/yearly", GetYearlySales);
stats.get("/daily", GetDailySales);
stats.get("/membership/today/:startOfToday", GetMembershipStats);
stats.get("/customer/birthday", GetTodaysBirthdayCount);

export default stats;
