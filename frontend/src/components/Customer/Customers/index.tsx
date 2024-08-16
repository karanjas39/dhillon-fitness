"use client";

import Loader from "@/components/Loader/Loader";
import { customerApi } from "@/store/api/customerApi";
import { DataTable } from "./data-table";
import { columns } from "./columns";

function CustomerTable() {
  const { data, isLoading } = customerApi.useGetAllCustomersQuery();
  if (isLoading) return <Loader />;

  return (
    <div className="mt-6 mb-3 w-full">
      {data?.success && data?.customers.length ? (
        <DataTable columns={columns} data={data.customers} />
      ) : (
        <p className="text-sm text-center text-muted-foreground">
          No customer is created yet.
        </p>
      )}
    </div>
  );
}

export default CustomerTable;
