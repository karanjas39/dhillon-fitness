import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { modifyDate } from "@/utils/helper";
import { Api_CustomerMemberships } from "@/utils/Types/apiTypes";

function MembershipTableBody({
  customerMemberships,
}: Pick<Api_CustomerMemberships, "customerMemberships">) {
  return (
    <TableBody className="w-full">
      {customerMemberships.map((membership, i) => (
        <TableRow className="cursor-pointer" key={i}>
          <TableCell>{membership.membership.name}</TableCell>
          <TableCell className="text-center">
            {modifyDate(membership.startDate)}
          </TableCell>
          <TableCell className="text-center">
            {modifyDate(membership.endDate)}
          </TableCell>
          <TableCell className="text-center">
            {membership.priceAtPurchase}
          </TableCell>
          <TableCell className="text-right">
            {membership.paymentAmount}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default MembershipTableBody;
