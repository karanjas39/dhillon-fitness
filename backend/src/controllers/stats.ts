import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
  parseISO,
  startOfDay,
  endOfDay,
  addDays,
  startOfYear,
  endOfYear,
  isToday,
} from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
const timeZone: string = "Asia/Kolkata";

export async function GetYearlySales(c: Context) {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const now = new Date();

    const zonedTime = toZonedTime(now, timeZone);

    const startOfYearInIST = startOfYear(zonedTime);
    const endOfYearInIST = endOfYear(zonedTime);

    const yearlyData = await prisma.userMembership.findMany({
      where: {
        startDate: {
          gte: startOfYearInIST,
          lte: endOfYearInIST,
        },
      },
      select: {
        paymentAmount: true,
        createdAt: true,
      },
    });

    const monthlyIncome = Array(12).fill(0);

    for (const entry of yearlyData) {
      const month = toZonedTime(entry.createdAt, timeZone).getMonth();
      monthlyIncome[month] += entry.paymentAmount || 0;
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

    const zonedTime = toZonedTime(now, timeZone);

    const startOfDayInIST = startOfDay(zonedTime);
    const endOfDayInIST = endOfDay(zonedTime);

    const dailyIncome = await prisma.userMembership.findMany({
      where: {
        createdAt: {
          gte: startOfDayInIST,
          lte: endOfDayInIST,
        },
      },
      select: {
        paymentAmount: true,
        user: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
    });

    const totalDailyIncome = dailyIncome.reduce((total, record) => {
      return total + (record.paymentAmount || 0);
    }, 0);

    return c.json({
      success: true,
      status: 200,
      totalIncome: totalDailyIncome,
      dailyIncome,
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

    const startDateParam = c.req.param("startOfToday");
    const startDate = parseISO(startDateParam);

    const startDateInIST = toZonedTime(startDate, timeZone);

    const startOfTodayInIST = startOfDay(startDateInIST);
    const endOfTodayInIST = endOfDay(startDateInIST);

    const startOfTodayUTC = fromZonedTime(startOfTodayInIST, timeZone);
    const endOfTodayUTC = fromZonedTime(endOfTodayInIST, timeZone);

    const expiringTodayCount = await prisma.userMembership.findMany({
      where: {
        endDate: {
          gte: addDays(startOfTodayUTC, 1),
          lt: addDays(startOfTodayUTC, 2),
        },
      },
      select: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const distinctUsersWithLiveMemberships =
      await prisma.userMembership.findMany({
        where: {
          endDate: {
            gt: endOfTodayUTC,
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
      expiringTodayCount: expiringTodayCount.length,
      liveUntilTodayCount,
      expiring: expiringTodayCount,
      dates: {
        startDateParam,
        startDate,
        startOfTodayInIST,
        endOfTodayInIST,
      },
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

export async function GetTodaysBirthdayCount(c: Context) {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const now = new Date();

    const zonedTime = toZonedTime(now, timeZone);

    const activeUsers = await prisma.user.findMany({
      where: {
        active: true,
      },
      select: {
        dob: true,
        id: true,
        name: true,
      },
    });

    const todayBirthdays = activeUsers.filter((user) => {
      if (user.dob) {
        const dob = new Date(user.dob);
        const dobInIST = toZonedTime(dob, timeZone);
        const dobMonthDay = new Date(
          zonedTime.getFullYear(),
          dobInIST.getMonth(),
          dobInIST.getDate()
        );

        return isToday(dobMonthDay);
      }
      return false;
    });

    return c.json({
      success: true,
      status: 200,
      birthdayCount: todayBirthdays.length,
      birthdays: todayBirthdays,
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 500,
      message:
        err.message || "An error occurred while retrieving the birthday count.",
    });
  }
}
