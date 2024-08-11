import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
  z_createUser,
  z_createUser_type,
  z_createUserMembership,
  z_createUserMembership_type,
} from "@singhjaskaran/dhillonfitness-common";

export async function CreateCustomer(c: Context) {
  const body: z_createUser_type = await c.req.json();

  const { success, data } = z_createUser.safeParse(body);

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

    const newUser = await prisma.user.create({
      data,
    });

    if (!newUser) throw new Error("Failed to create new customer.");

    return c.json({
      success: true,
      status: 200,
      message: "New customer is created successfuly.",
      userId: newUser.id,
    });
  } catch (error) {
    return c.json({
      success: false,
      status: 400,
      message: error,
    });
  }
}

export async function CreateCustomerMembership(c: Context) {
  const body: z_createUserMembership_type = await c.req.json();

  const { success, data } = z_createUserMembership.safeParse(body);

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

    const isMembershipExist = await prisma.membership.findUnique({
      where: {
        id: data.membershipId,
      },
    });

    if (!isMembershipExist) throw new Error("No such membership plan exist.");

    const now = new Date();
    const utcOffsetMinutes = now.getTimezoneOffset();
    const indiaOffsetMinutes = 330;
    const totalOffsetMinutes = indiaOffsetMinutes + utcOffsetMinutes;
    const startDate = new Date(now.getTime() + totalOffsetMinutes * 60 * 1000);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + isMembershipExist.durationDays);
    endDate.setHours(23, 59, 59, 999);

    const isUser = await prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });

    if (!isUser) throw new Error("No such customer exist.");

    let newBalance;

    if (data.paymentAmount > isMembershipExist.price) {
      if (isUser.balance < 0) {
        newBalance =
          isUser.balance + (data.paymentAmount - isMembershipExist.price);
      } else {
        newBalance =
          data.paymentAmount - isMembershipExist.price + isUser.balance;
      }
    } else {
      if (isUser.balance < 0) {
        newBalance =
          isUser.balance + (data.paymentAmount - isMembershipExist.price);
      } else {
        newBalance =
          isUser.balance - (isMembershipExist.price - data.paymentAmount);
      }
    }

    await prisma.user.update({
      where: { id: isUser.id },
      data: { balance: newBalance },
    });

    const newUserMembership = await prisma.userMembership.create({
      data: {
        ...data,
        endDate,
        startDate,
        priceAtPurchase: isMembershipExist.price,
      },
    });

    if (!newUserMembership)
      throw new Error("Failed to create customer membership.");

    return c.json({
      success: true,
      status: 200,
      message: "Customer membership is created successfuly.",
    });
  } catch (error) {
    const err = error as Error;

    return c.json({
      success: false,
      status: 400,
      message:
        err && err.message
          ? err.message
          : "Error while creating user membership.",
    });
  }
}

export async function GetAllCustomers(c: Context) {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const customers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        phone: true,
        memberships: {
          select: {
            membership: {
              select: {
                name: true,
              },
            },
            endDate: true,
          },
        },
      },
    });

    if (!customers.length) throw new Error("No customers found.");

    return c.json({
      success: true,
      status: 200,
      customers,
    });
  } catch (error) {
    const err = error as Error;

    return c.json({
      success: false,
      status: 400,
      message:
        err && err.message ? err.message : "Error while fetching customers.",
    });
  }
}
