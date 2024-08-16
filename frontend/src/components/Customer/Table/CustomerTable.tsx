"use client";

import { Table, TableCaption } from "@/components/ui/table";
import CustomerTableHeader from "./CustomerTableHeader";
import CustomerTableBody from "./CustomerTableBody";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { customerApi } from "@/store/api/customerApi";
import Loader from "@/components/Loader/Loader";

function CustomerTable() {
  const { data, isLoading } = customerApi.useGetAllCustomersQuery();

  if (isLoading && !data) return <Loader />;

  return (
    <div className="mt-4 w-full flex flex-col gap-2">
      {data?.success && (
        <ScrollArea className="max-h-[500px]  min-h-max max-w-full overflow-x-auto overflow-y-auto mt-2 pr-4 pb-4">
          <Table className="min-w-[600px] sm:min-w-[800px] md:min-w-[1000px]">
            <TableCaption>A list of all the customers.</TableCaption>
            <CustomerTableHeader />
            <CustomerTableBody customers={data.customers} />
          </Table>
          <ScrollBar orientation="vertical" />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  );
}

export default CustomerTable;
