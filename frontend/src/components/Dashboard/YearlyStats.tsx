"use client";

import { statsApi } from "@/store/api/statsApi";
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltipContent,
  ChartTooltip,
  ChartLegendContent,
  ChartLegend,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import Loader from "@/components/Loader/Loader";

function YearlyStats() {
  const { data, isLoading } = statsApi.useGetYearlyStatsQuery();

  const chartConfig = {
    totalIncome: {
      label: "Sales",
      theme: {
        light: "#2563eb",
        dark: "#60a5fa",
      },
    },
  } satisfies ChartConfig;

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col mb-4 mt-4">
          <h2 className="sm:text-2xl text-xl font-bold">Yearly Sales</h2>
          <p className="text-muted-foreground sm:text-lg text-base font-semibold">
            Total revenue generated this year
          </p>
        </div>
        {!isLoading && data?.success ? (
          <ChartContainer
            config={chartConfig}
            className="min-h-[200px] max-h-[500px] w-full"
          >
            <BarChart accessibilityLayer data={data.monthlyIncome}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="totalIncome"
                fill="var(--color-totalIncome)"
                fillOpacity={0.6}
                activeBar={<Rectangle fillOpacity={0.8} />}
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}

export default YearlyStats;
