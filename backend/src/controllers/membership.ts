import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
  z_createMembership,
  z_id,
  z_updateMembership,
} from "@singhjaskaran/dhillonfitness-common";

export async function CreateMembership(c: Context) {
  const body = await c.req.json();

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
      data: {
        durationDays: data.durationDays,
        name: data.name,
        price: data.price,
        description: data.description ? data.description : "",
      },
    });

    if (!newMembership) throw new Error("Failed to create new membership.");

    return c.json({
      success: true,
      status: 200,
      message: "New membership is created successfuly.",
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message ? err.message : "Error while creating membership.",
    });
  }
}

export async function UpdateMembership(c: Context) {
  const body = await c.req.json();

  const { success, data } = z_updateMembership.safeParse(body);

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

    const { id, ...dataToUpdate } = data;

    if (!Object.keys(dataToUpdate).length)
      throw new Error("Nothing is provided to update.");

    const updatedMembership = await prisma.membership.update({
      where: {
        id: id,
        active: true,
      },
      data: {
        ...dataToUpdate,
      },
    });

    if (!updatedMembership) throw new Error("Failed to update membership.");

    return c.json({
      success: true,
      status: 200,
      message: "Membership is updated successfuly.",
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message ? err.message : "Error while updating membership.",
    });
  }
}

export async function GetMembershipIds(c: Context) {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const membershipIds = await prisma.membership.findMany({
      where: {
        active: true,
      },
      select: {
        id: true,
        name: true,
        price: true,
      },
    });
    return c.json({
      success: true,
      status: 200,
      ids: membershipIds,
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message
        ? err.message
        : "Failed while fetching membership ids.",
    });
  }
}

export async function GetAllMemberships(c: Context) {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const memberships = await prisma.membership.findMany({
      where: {
        active: true,
      },
    });
    return c.json({
      success: true,
      status: 200,
      memberships,
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message ? err.message : "Failed while fetching memberships.",
    });
  }
}

export async function deleteMembership(c: Context) {
  const body = await c.req.json();

  const { success, data } = z_id.safeParse(body);

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

    await prisma.membership.update({
      where: {
        id: data.id,
      },
      data: {
        active: false,
      },
    });

    return c.json({
      success: true,
      status: 200,
      message: "This membership has been deleted successfuly.",
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message
        ? err.message.toString()
        : "Failed while deleting membership.",
    });
  }
}

export async function GetExpiredMemberships(c: Context) {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const nowUTC = new Date();
    const istOffsetMinutes = 330;
    const nowIST = new Date(nowUTC.getTime() + istOffsetMinutes * 60 * 1000);

    const expiredMemberships = await prisma.userMembership.findMany({
      where: {
        endDate: {
          lt: nowIST,
        },
      },
      select: {
        membership: {
          select: {
            name: true,
          },
        },
        endDate: true,
        user: {
          select: {
            name: true,
            phone: true,
          },
        },
      },
    });

    return c.json({
      success: true,
      status: 200,
      expiredMemberships,
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message
        ? err.message
        : "Error while retrieving expired memberships.",
    });
  }
}
