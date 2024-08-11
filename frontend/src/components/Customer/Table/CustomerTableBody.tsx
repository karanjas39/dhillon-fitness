"use client";

import Loader from "@/components/Loader/Loader";
import { Badge } from "@/components/ui/badge";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { customerApi } from "@/store/api/customerApi";
import { isMembershipExpired } from "@/utils/helper";
import { useRouter } from "next/navigation";

function CustomerTableRow() {
  const { data, isLoading } = customerApi.useGetAllCustomersQuery();
  const router = useRouter();

  function handleRowClick(id: string) {
    router.push(`/customer/detail/${id}`);
  }

  if (isLoading && !data) return <Loader className="w-full self-center" />;

  return (
    <TableBody className="w-full">
      {data?.customers.map((customer) => (
        <TableRow
          onClick={() => handleRowClick(customer.id)}
          key={customer.id}
          className="cursor-pointer"
        >
          <TableCell>{customer.name}</TableCell>
          <TableCell>{customer.phone}</TableCell>
          <TableCell>{customer.memberships[0].membership.name}</TableCell>
          <TableCell className="text-right">
            {isMembershipExpired(customer.memberships[0].endDate) ? (
              <Badge variant="destructive">Expired</Badge>
            ) : (
              <Badge variant="secondary">Live</Badge>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default CustomerTableRow;
