import { Context } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z_updatePassword } from "@singhjaskaran/dhillonfitness-common";
import { compareSync, hashSync } from "bcrypt-ts";

export async function ChangePassword(c: Context) {
  const body = await c.req.json();

  const { success, data } = z_updatePassword.safeParse(body);

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

    if (data.newPassword != data.confirmNewPassword)
      throw new Error("Confirmed Password is not same.");

    const isAdminExist = await prisma.admin.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!isAdminExist) throw new Error("No such user exist.");

    const isPasswordCorrect = compareSync(
      data.prevPassword,
      isAdminExist.password
    );

    if (!isPasswordCorrect) throw new Error("Previous Password is incorrect");

    const hashedPassword = hashSync(data.newPassword, 10);

    await prisma.admin.update({
      where: {
        id: data.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return c.json({
      success: true,
      status: 200,
      message: "Password has been updated successfuly.",
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message ? err.message : "Error while changing password.",
    });
  }
}
