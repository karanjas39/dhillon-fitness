import { Context } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z_signin } from "@singhjaskaran/dhillonfitness-common";
import { compareSync } from "bcrypt-ts";

export async function Signin(c: Context) {
  const body = await c.req.json();

  const { success, data } = z_signin.safeParse(body);

  if (!success) {
    return c.json({
      success: false,
      status: 404,
      message: "Invalid inputs are passed.",
    });
  }

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const isAdminExist = await prisma.admin.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!isAdminExist)
      return c.json({
        success: false,
        status: 400,
        message: "Password or email is incorrect.",
      });

    const isPasswordCorrect = compareSync(data.password, isAdminExist.password);

    if (!isPasswordCorrect)
      return c.json({
        success: false,
        status: 400,
        message: "Password or email is incorrect.",
      });

    const token = await sign({ admin: true }, c.env.JWT_SECRET);

    return c.json({
      success: true,
      status: 200,
      token,
    });
  } catch (error) {
    return c.json({
      success: false,
      status: 400,
      message: "Error while logging in right now.",
    });
  }
}
