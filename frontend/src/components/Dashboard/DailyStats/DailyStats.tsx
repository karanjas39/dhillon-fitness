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
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import DailyStatsList from "./DailyStatsList";

function DailyStats() {
  const { data, isLoading } = statsApi.useGetDailyStatsQuery();
  const { dailyTarget } = useSelector((state: RootState) => state.admin);
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    if (!isLoading && data?.success && dailyTarget) {
      const timer = setTimeout(() => {
        const progressPercentage = (data.totalIncome / dailyTarget) * 100;
        const progress = Math.max(0, Math.min(100, progressPercentage));
        setProgress(progress);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, data, dailyTarget]);

  return (
    <div>
      <div className="flex flex-col mb-4 mt-4">
        <h2 className="sm:text-2xl text-xl font-bold">Today&lsquo;s Sale</h2>
        <p className="text-muted-foreground sm:text-lg text-base font-semibold">
          Total revenue generated today
        </p>
      </div>
      {!isLoading && data?.success && dailyTarget ? (
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between">
              <span>Today's Sale</span>
              {data.dailyIncome.length ? (
                <span>
                  <DailyStatsList dailyIncome={data.dailyIncome} />
                </span>
              ) : null}
            </CardDescription>
            <CardTitle className="text-4xl">
              &#8377; {data.totalIncome}
            </CardTitle>
          </CardHeader>
          <CardFooter>
            <Progress value={progress} max={dailyTarget} />
          </CardFooter>
        </Card>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default DailyStats;
