import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { modifyDate } from "@/utils/helper";
import { Api_CustomerMemberships } from "@/utils/Types/apiTypes";

function MembershipTableBody({
  customerMemberships,
}: Pick<Api_CustomerMemberships, "customerMemberships">) {
  return (
    <TableBody className="w-full">
      {customerMemberships.map((membership) => (
        <TableRow className="cursor-pointer">
          <TableCell>{membership.membership.name}</TableCell>
          <TableCell>{modifyDate(membership.startDate)}</TableCell>
          <TableCell>{modifyDate(membership.endDate)}</TableCell>
          <TableCell>{membership.priceAtPurchase}</TableCell>
          <TableCell className="text-right">
            {membership.paymentAmount}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default MembershipTableBody;
