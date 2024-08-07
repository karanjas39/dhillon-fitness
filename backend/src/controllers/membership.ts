import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
  z_createMembership,
  z_createMembership_type,
} from "@singhjaskaran/dhillonfitness-common";

export async function CreateMembership(c: Context) {
  const body: z_createMembership_type = await c.req.json();

  const { success, data } = z_createMembership.safeParse(body);

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

    const newMembership = await prisma.membership.create({
      data,
    });

    if (!newMembership) throw new Error("Failed to create new membership.");

    return c.json({
      success: true,
      status: 200,
      message: "New membership is created successfuly.",
    });
  } catch (error) {
    return c.json({
      success: false,
      status: 400,
      message: error,
    });
  }
}
