"use client";

import { Table, TableCaption } from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MembershipTableHeader from "./MembershipTableHeader";
import MembershipTableBody from "./MembershipTableBody";
import { membershipApi } from "@/store/api/membershipApi";
import Loader from "../Loader/Loader";

function MembershipTable() {
  const { data, isLoading } = membershipApi.useGetAllMembershipIdsQuery({
    onlyActive: false,
  });

  if (isLoading) return <Loader />;

  return (
    <>
      {data?.success ? (
        <ScrollArea className="max-h-[500px]  min-h-max max-w-full overflow-x-auto overflow-y-auto mt-2 pr-4 pb-4">
          <Table className="min-w-[600px] sm:min-w-[800px] md:min-w-[1000px]">
            <TableCaption>
              {data.ids.length
                ? "A list of all the memberships."
                : "No membership plan is created yet."}
            </TableCaption>
            {data.ids.length ? (
              <>
                <MembershipTableHeader />
                <MembershipTableBody ids={data.ids} />
              </>
            ) : null}
          </Table>
          <ScrollBar orientation="vertical" />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : null}
    </>
  );
}

export default MembershipTable;
