"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loader from "@/components/Loader/Loader";
import { statsApi } from "@/store/api/statsApi";

function CustomerBirthday() {
  const { data, isLoading } = statsApi.useGetCustomerBirthdayQuery();

  return (
    <div>
      <div className="flex flex-col mb-4 mt-4">
        <h2 className="sm:text-2xl text-xl font-bold">
          Today&lsquo;s Birthdays
        </h2>
        {/* <p className="text-muted-foreground sm:text-lg text-base font-semibold">
          Customers with birthdays today
        </p> */}
      </div>
      {!isLoading && data?.success ? (
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>Total Birthdays</CardDescription>
            <CardTitle className="text-4xl">{data.birthdayCount}</CardTitle>
          </CardHeader>
        </Card>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default CustomerBirthday;
