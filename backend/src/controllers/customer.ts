import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
  z_createUser,
  z_createUser_type,
  z_createUserMembership,
  z_createUserMembership_type,
  z_id,
  z_updateUser,
} from "@singhjaskaran/dhillonfitness-common";
import { getCurrentDate } from "../helpers/helper";

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

    const isMembershipExist = await prisma.membership.findUnique({
      where: {
        id: data.membershipId,
        active: true,
      },
    });

    if (!isMembershipExist) throw new Error("No such membership plan exist.");

    const balance = data.paymentAmount - isMembershipExist.price;

    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        address: data.address,
        phone: data.phone,
        sex: data.sex,
        balance,
        email: data.email ? data.email : null,
      },
    });

    if (!newUser) throw new Error("Failed to create new customer.");

    const { startDate, endDate } = getCurrentDate();
    endDate.setDate(endDate.getDate() + isMembershipExist.durationDays);
    endDate.setHours(23, 59, 59, 999);

    const newUserMembership = await prisma.userMembership.create({
      data: {
        userId: newUser.id,
        paymentAmount: data.paymentAmount,
        membershipId: data.membershipId,
        endDate,
        startDate,
        priceAtPurchase: isMembershipExist.price,
      },
    });

    if (!newUserMembership)
      throw new Error("Customer created but membership not added.");

    return c.json({
      success: true,
      status: 200,
      message: "New customer is created successfuly.",
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message ? err.message : "Failed to create new Customer.",
    });
  }
}

export async function UpdateCustomer(c: Context) {
  const body = await c.req.json();

  const { success, data } = z_updateUser.safeParse(body);

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

    const { id, ...dataToBeUpdated } = data;

    if (!Object.keys(dataToBeUpdated).length)
      throw new Error("No data is provided to update customer.");

    await prisma.user.update({
      where: {
        id: data.id,
      },
      data: dataToBeUpdated,
    });

    return c.json({
      success: true,
      status: 200,
      message: "Customer is updated successfuly.",
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message ? err.message : "Failed to update Customer.",
    });
  }
}

export async function RenewCustomerMembership(c: Context) {
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

    const { startDate, endDate } = getCurrentDate();
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
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
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

export async function GetCustomerDetails(c: Context) {
  const params = c.req.param();

  const { success, data } = z_id.safeParse(params);

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

    const customer = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        address: true,
        balance: true,
        email: true,
        sex: true,
        joinDate: true,
      },
    });

    if (!customer) throw new Error("No customers found.");

    return c.json({
      success: true,
      status: 200,
      customer,
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

export async function GetCustomerMemberships(c: Context) {
  const params = c.req.param();

  const { success, data } = z_id.safeParse(params);

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

    const customerMemberships = await prisma.userMembership.findMany({
      where: {
        userId: data.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        startDate: true,
        endDate: true,
        membership: {
          select: {
            name: true,
          },
        },
        paymentAmount: true,
        priceAtPurchase: true,
      },
    });

    if (!customerMemberships.length) throw new Error("No customers found.");

    return c.json({
      success: true,
      status: 200,
      customerMemberships,
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

export async function DeleteCustomerMembership(c: Context) {
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

    await prisma.userMembership.delete({
      where: {
        id: data.id,
      },
    });

    return c.json({
      success: true,
      status: 200,
      message: "This Customer membership is deleted successfuly.",
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message
        ? err.message.toString()
        : "Failed while deleting customer membership.",
    });
  }
}
