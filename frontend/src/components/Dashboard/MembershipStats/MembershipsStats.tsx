"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { statsApi } from "@/store/api/statsApi";
import Loader from "@/components/Loader/Loader";
import ExpiredMembershipList from "./ExpiredMembershipList";

function MembershipsStats() {
  const { data, isLoading } = statsApi.useGetMembershipStatsQuery();

  return (
    <div>
      <div className="flex flex-col mb-4 mt-4">
        <h2 className="sm:text-2xl text-xl font-bold">
          Memberships Overview for Today
        </h2>
      </div>
      {!isLoading && data?.success ? (
        <div className="grid grid-cols-2 gap-2">
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center justify-between">
                <span>Expired Memberships</span>
                {data.expired.length ? (
                  <span>
                    <ExpiredMembershipList expired={data.expired} />
                  </span>
                ) : null}
              </CardDescription>
              <CardTitle className="text-4xl">
                {data.expiredTodayCount}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>Live Memberships</CardDescription>
              <CardTitle className="text-4xl">
                {data.liveUntilTodayCount}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default MembershipsStats;
