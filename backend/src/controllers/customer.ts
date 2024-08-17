import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
  z_clearBalance,
  z_createUser,
  z_createUser_type,
  z_createUserMembership,
  z_createUserMembership_type,
  z_deleteUserMembership,
  z_id,
  z_updateUser,
  z_updateUserMembership,
  z_userActivation,
} from "@singhjaskaran/dhillonfitness-common";
import { calculateEndDate, getCurrentDate } from "../helpers/helper";

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

    let balance: number = 0;
    let isMembershipExist;

    if (data.membershipId && data.startDate) {
      isMembershipExist = await prisma.membership.findUnique({
        where: {
          id: data.membershipId,
          active: true,
        },
      });

      if (!isMembershipExist) throw new Error("No such membership plan exist.");

      balance = data.paymentAmount
        ? data.paymentAmount - isMembershipExist.price
        : 0 - isMembershipExist.price;
    }

    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        address: data.address,
        phone: data.phone,
        sex: data.sex,
        balance,
        email: data.email ? data.email : null,
        dob: data.dob,
        active: data.membershipId ? true : false,
      },
    });

    if (!newUser) throw new Error("Failed to create new customer.");

    if (isMembershipExist && data.startDate) {
      const endDate = calculateEndDate(
        data.startDate,
        isMembershipExist.durationDays
      );

      const newUserMembership = await prisma.userMembership.create({
        data: {
          userId: newUser.id,
          paymentAmount: data.paymentAmount || 0,
          membershipId: isMembershipExist.id,
          endDate,
          startDate: data.startDate,
          priceAtPurchase: isMembershipExist.price,
        },
      });

      if (!newUserMembership)
        throw new Error("Customer created but membership not added.");
    }

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

export async function DeleteCustomer(c: Context) {
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

    await prisma.userMembership.deleteMany({
      where: {
        userId: data.id,
      },
    });

    await prisma.user.delete({
      where: {
        id: data.id,
      },
    });

    return c.json({
      success: true,
      status: 200,
      message: "Customer is deleted successfuly.",
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message ? err.message : "Failed to delete Customer.",
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

    const endDate = calculateEndDate(
      data.startDate,
      isMembershipExist.durationDays
    );

    const isUser = await prisma.user.findUnique({
      where: {
        id: data.userId,
        active: true,
      },
    });

    if (!isUser)
      throw new Error("No such customer exist or user is deactivated.");

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
        userId: data.userId,
        membershipId: data.membershipId,
        startDate: data.startDate,
        endDate,
        paymentAmount: data.paymentAmount,
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

export async function DeleteCustomerMembership(c: Context) {
  const body = await c.req.json();

  const { success, data } = z_deleteUserMembership.safeParse(body);

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

    const user = await prisma.user.findUnique({
      where: {
        id: data.userId,
      },
      select: {
        balance: true,
        memberships: {
          where: {
            id: data.id,
          },
          select: {
            paymentAmount: true,
            priceAtPurchase: true,
          },
        },
      },
    });

    if (!user) throw new Error("Customer not found.");
    if (user.memberships.length === 0) throw new Error("Membership not found.");

    if (user.balance != 0) {
      const membership = user.memberships[0];

      const balanceAdjustment =
        membership.priceAtPurchase - membership.paymentAmount;

      const newBalance = user.balance + balanceAdjustment;

      await prisma.user.update({
        where: { id: data.userId },
        data: { balance: newBalance },
      });
    }

    await prisma.userMembership.delete({
      where: { id: data.id },
    });

    return c.json({
      success: true,
      status: 200,
      message: "Customer membership is deleted successfuly.",
    });
  } catch (error) {
    const err = error as Error;

    return c.json({
      success: false,
      status: 400,
      message:
        err && err.message
          ? err.message
          : "Error while deleting user membership.",
    });
  }
}

export async function UpdateCustomerMembership(c: Context) {
  const body = await c.req.json();

  const { success, data } = z_updateUserMembership.safeParse(body);

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

    const updatedUserMembership = await prisma.userMembership.update({
      where: {
        id,
      },
      data: { ...dataToBeUpdated },
    });

    if (!updatedUserMembership)
      throw new Error("Customer membership is not updated.");

    return c.json({
      success: true,
      status: 200,
      message: "Customer membership is updated successfuly.",
    });
  } catch (error) {
    const err = error as Error;

    return c.json({
      success: false,
      status: 400,
      message:
        err && err.message
          ? err.message
          : "Error while updating user membership.",
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
        active: true,
        address: true,
        memberships: {
          orderBy: {
            endDate: "desc",
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
        createdAt: true,
        dob: true,
        active: true,
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
        id: true,
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

export async function CustomerActivation(c: Context) {
  const body = await c.req.json();

  const { success, data } = z_userActivation.safeParse(body);

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

    const now = new Date();
    const utcOffsetMinutes = now.getTimezoneOffset();
    const indiaOffsetMinutes = 330;
    const totalOffsetMinutes = indiaOffsetMinutes + utcOffsetMinutes;
    const currentIST = new Date(now.getTime() + totalOffsetMinutes * 60 * 1000);

    const userWithMembershipAndBalance = await prisma.user.findUnique({
      where: {
        id: data.userId,
      },
      select: {
        balance: true,
        memberships: {
          where: {
            endDate: {
              gt: currentIST,
            },
          },
          select: {
            id: true,
          },
        },
      },
    });

    if (
      userWithMembershipAndBalance &&
      (userWithMembershipAndBalance.balance !== 0 ||
        userWithMembershipAndBalance.memberships.length > 0)
    ) {
      throw new Error("Customer has an active membership or pending balance.");
    }

    const updatedCustomer = await prisma.user.update({
      where: {
        id: data.userId,
      },
      data: {
        active: data.active,
      },
    });

    if (!updatedCustomer)
      throw new Error(
        `Failed to ${data.active ? "activate" : "deactivate"} customer.`
      );

    return c.json({
      success: true,
      status: 200,
      message: `Customer is ${
        data.active ? "activated" : "deactivated"
      } successfuly.`,
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message
        ? err.message.toString()
        : "Failed while customer activation.",
    });
  }
}

export async function ClearUserBalance(c: Context) {
  const body = await c.req.json();
  const { success, data } = z_clearBalance.safeParse(body);

  if (!success) {
    return c.json({
      success: false,
      status: 400,
      message: "Invalid input data.",
    });
  }

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const { userId, amount, type } = data;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        memberships: {
          where: {
            endDate: {
              gt: new Date(),
            },
          },
          orderBy: {
            endDate: "desc",
          },
          take: 1,
        },
      },
    });

    if (!user) throw new Error("Customer not found.");

    let updatedBalance = user.balance;

    if (type === "refund") {
      if (user.balance > 0) {
        updatedBalance = user.balance - amount;
      } else
        throw new Error("Refund not possible as the balance is not positive.");
    } else if (type === "payment") {
      if (user.balance < 0 || user.balance === 0) {
        updatedBalance = user.balance + amount;
      } else
        throw new Error("Payment not possible as the balance is not negative.");
    } else throw new Error("Invalid transaction type.");

    await prisma.user.update({
      where: { id: userId },
      data: { balance: updatedBalance },
    });

    if (user.memberships.length > 0) {
      const activeMembership = user.memberships[0];
      let newPaymentAmount: number;

      if (type === "refund") {
        newPaymentAmount = activeMembership.paymentAmount - amount;
      } else {
        newPaymentAmount = activeMembership.paymentAmount + amount;
      }

      await prisma.userMembership.update({
        where: { id: activeMembership.id },
        data: {
          paymentAmount: newPaymentAmount,
        },
      });
    }

    return c.json({
      success: true,
      status: 200,
      message: "Balance and membership payment updated successfully.",
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 500,
      message: err.message || "An error occurred while updating the balance.",
    });
  }
}
