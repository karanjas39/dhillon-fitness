"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loader from "@/components/Loader/Loader";
import { statsApi } from "@/store/api/statsApi";
import BirthdayList from "./BirthdayList";

function CustomerBirthday() {
  const { data, isLoading } = statsApi.useGetCustomerBirthdayQuery();

  return (
    <div>
      <div className="flex flex-col mb-4 mt-4">
        <h2 className="sm:text-2xl text-xl font-bold">
          Today&lsquo;s Birthdays
        </h2>
      </div>
      {!isLoading && data?.success ? (
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between">
              <span>Total Birthday</span>
              {data.birthdays.length ? (
                <span>
                  <BirthdayList birthdays={data.birthdays} />
                </span>
              ) : null}
            </CardDescription>
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
