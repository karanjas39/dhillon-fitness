"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { statsApi } from "@/store/api/statsApi";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";

function MonthlyStats() {
  const { data, isLoading } = statsApi.useGetDailyStatsQuery();
  const goalIncome = 2000;
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    if (!isLoading && data?.success) {
      const timer = setTimeout(() => {
        const progressPercentage = (data.totalIncome / goalIncome) * 100;
        const progress = Math.max(0, Math.min(100, progressPercentage));
        setProgress(progress);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, data]);

  return (
    <div>
      <div className="flex flex-col mb-4 mt-4">
        <h2 className="sm:text-2xl text-xl font-bold">Today&lsquo;s Sale</h2>
        <p className="text-muted-foreground sm:text-lg text-base font-semibold">
          Total revenue generated today
        </p>
      </div>
      {!isLoading && data?.success ? (
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>Today&lsquo;s Sale</CardDescription>
            <CardTitle className="text-4xl">
              &#8377; {data.totalIncome}
            </CardTitle>
          </CardHeader>
          <CardFooter>
            <Progress value={progress} max={goalIncome} />
          </CardFooter>
        </Card>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default MonthlyStats;
