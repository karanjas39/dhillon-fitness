import { Table, TableCaption } from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MembershipTableHeader from "./MembershipTableHeader";
import MembershipTableBody from "./MembershipTableBody";
import { customerApi } from "@/store/api/customerApi";
import Loader from "@/components/Loader/Loader";

function MembershipTable({ id }: { id: string }) {
  const { data, isLoading } = customerApi.useGetCustomerMembershipsQuery({
    id,
  });

  if (isLoading && !data) return <Loader />;

  return (
    <>
      {data?.success && (
        <ScrollArea className="max-h-[500px]  min-h-max max-w-full overflow-x-auto overflow-y-auto mt-3 pr-4 pb-4">
          <Table className="min-w-[600px] sm:min-w-[800px] md:min-w-[1000px]">
            <TableCaption>
              {data.customerMemberships.length
                ? "A list of all the customer memberships"
                : "No membership plan is activated yet."}
            </TableCaption>
            {data.customerMemberships.length ? (
              <>
                <MembershipTableHeader />
                <MembershipTableBody
                  customerMemberships={data?.customerMemberships}
                />
              </>
            ) : null}
          </Table>
          <ScrollBar orientation="vertical" />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </>
  );
}

export default MembershipTable;
