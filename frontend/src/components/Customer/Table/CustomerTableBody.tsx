"use client";

import { Badge } from "@/components/ui/badge";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { isMembershipExpired, modifyDate } from "@/utils/helper";
import { Api_AllCustomers } from "@/utils/Types/apiTypes";
import { useRouter } from "next/navigation";

function CustomerTableRow({ customers }: Pick<Api_AllCustomers, "customers">) {
  const router = useRouter();

  function handleRowClick(id: string) {
    router.push(`/customer/detail/${id}`);
  }

  return (
    <TableBody className="w-full">
      {customers.map((customer, i) => (
        <TableRow
          onClick={() => handleRowClick(customer.id)}
          key={customer.id}
          className="cursor-pointer"
        >
          <TableCell>{i + 1}</TableCell>
          <TableCell>{customer.name}</TableCell>
          <TableCell className="text-center">
            {modifyDate(customer.memberships[0].endDate)}
          </TableCell>
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
