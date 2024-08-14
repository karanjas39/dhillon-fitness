import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export async function GetYearlySales(c: Context) {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const now = new Date();

    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

    const yearlyData = await prisma.userMembership.findMany({
      where: {
        startDate: {
          gte: startOfYear,
          lte: endOfYear,
        },
      },
      select: {
        paymentAmount: true,
        createdAt: true,
      },
    });

    const monthlyIncome = Array(12).fill(0);

    for (const entry of yearlyData) {
      const month = new Date(entry.createdAt).getMonth();
      monthlyIncome[month] += entry.paymentAmount;
    }

    const formattedMonthlyIncome = monthlyIncome.map((totalIncome, index) => ({
      month: new Date(now.getFullYear(), index, 1).toLocaleString("default", {
        month: "long",
      }),
      totalIncome,
    }));

    return c.json({
      success: true,
      status: 200,
      monthlyIncome: formattedMonthlyIncome,
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message
        ? err.message
        : "Error while retrieving yearly sales data.",
    });
  }
}

export async function GetDailySales(c: Context) {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0
    );
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999
    );

    const dailyIncome = await prisma.userMembership.aggregate({
      _sum: {
        paymentAmount: true,
      },
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    const totalDailyIncome = dailyIncome._sum.paymentAmount || 0;

    return c.json({
      success: true,
      status: 200,
      totalIncome: totalDailyIncome,
      date: startOfDay.toISOString(),
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message || "Error while retrieving daily sales data.",
    });
  }
}

export async function GetMembershipStats(c: Context) {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const now = new Date();
    const utcOffsetMinutes = now.getTimezoneOffset();
    const indiaOffsetMinutes = 330;
    const totalOffsetMinutes = indiaOffsetMinutes + utcOffsetMinutes;
    const currentIST = new Date(now.getTime() + totalOffsetMinutes * 60 * 1000);

    const endOfToday = new Date(currentIST.setHours(23, 59, 59, 999));

    const expiredTodayCount = await prisma.userMembership.count({
      where: {
        endDate: {
          lte: endOfToday,
        },
      },
    });

    const distinctUsersWithLiveMemberships =
      await prisma.userMembership.findMany({
        where: {
          endDate: {
            gt: currentIST,
          },
        },
        select: {
          userId: true,
        },
        distinct: ["userId"],
      });

    const liveUntilTodayCount = distinctUsersWithLiveMemberships.length;

    return c.json({
      success: true,
      status: 200,
      expiredTodayCount,
      liveUntilTodayCount,
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message || "Failed to retrieve membership stats.",
    });
  }
}
