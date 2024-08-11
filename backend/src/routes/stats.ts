import { Hono } from "hono";
import { GetDailySales, GetYearlySales } from "../controllers/stats";

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

export default stats;
