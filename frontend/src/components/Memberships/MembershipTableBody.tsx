"use client";

import { Api_MembershipIds } from "@/utils/Types/apiTypes";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";

function MembershipTableBody({ ids }: Pick<Api_MembershipIds, "ids">) {
  const router = useRouter();

  function handleRowClick(id: string) {
    router.push(`/membership/detail/${id}`);
  }

  return (
    <TableBody className="w-full">
      {ids.map((membership) => (
        <TableRow
          key={membership.id}
          onClick={() => handleRowClick(membership.id)}
        >
          <TableCell>{membership.name}</TableCell>
          <TableCell className="text-center">
            {membership.durationDays}
          </TableCell>
          <TableCell className="text-center">{membership.price}</TableCell>
          <TableCell className="text-right">
            {membership.active ? (
              <Badge variant="constructive">Active</Badge>
            ) : (
              <Badge variant="destructive">Not active</Badge>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default MembershipTableBody;
