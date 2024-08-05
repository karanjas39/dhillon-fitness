import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use("*", cors());

app.all(async (c) => {
  return c.json({
    success: true,
    statue: 200,
    message: "Hello from dhillon-fitness backend :)",
  });
});

export default app;
