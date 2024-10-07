"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loader from "@/components/Loader/Loader";
import { statsApi } from "@/store/api/statsApi";
import UserWithBalanceList from "./UserWithBalanceList";

function UserWithBalance() {
  const { data, isLoading } = statsApi.useGetUsersWithBalanceQuery();

  return (
    <div>
      <div className="flex flex-col mb-4 mt-4">
        <h2 className="sm:text-2xl text-xl font-bold">Pending Payments</h2>
      </div>
      {!isLoading && data?.success ? (
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center justify-between">
              <span>Total Pending Payments</span>
              {data.users.length ? (
                <span>{<UserWithBalanceList users={data.users} />}</span>
              ) : null}
            </CardDescription>
            <CardTitle className="text-4xl">{data.users.length}</CardTitle>
          </CardHeader>
        </Card>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default UserWithBalance;
