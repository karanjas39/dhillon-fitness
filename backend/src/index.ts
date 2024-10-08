import { Hono } from "hono";
import { cors } from "hono/cors";
import auth from "./routes/auth";
import membership from "./routes/membership";
import customer from "./routes/customer";
import { authMiddleware } from "./middlewares/auth";
import admin from "./routes/admin";
import stats from "./routes/stats";

const app = new Hono();

app.use("*", cors());
app.use("/api/v1/admin/*", authMiddleware);

app.route("/api/v1/auth", auth);
app.route("/api/v1/admin/customer", customer);
app.route("/api/v1/admin/membership", membership);
app.route("/api/v1/admin", admin);
app.route("/api/v1/admin/stats", stats);

app.all("*", async (c) => {
  return c.json({
    success: true,
    statue: 200,
    message: "Hello from dhillon-fitness backend :)",
  });
});

export default app;
