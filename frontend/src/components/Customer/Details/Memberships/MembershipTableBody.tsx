import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { modifyDate, modifyEndDate } from "@/utils/helper";
import { Api_CustomerMemberships } from "@/utils/Types/apiTypes";
import EditMembership from "@/components/Customer/Details/Memberships/Edit/EditMembership";
import DeleteMembership from "@/components/Customer/Details/Memberships/Delete/DeleteMembership";

function MembershipTableBody({
  customerMemberships,
}: Pick<Api_CustomerMemberships, "customerMemberships">) {
  return (
    <TableBody className="w-full">
      {customerMemberships.map((membership, i) => (
        <TableRow key={i}>
          <TableCell>{membership.membership.name}</TableCell>
          <TableCell className="text-center">
            {modifyDate(membership.startDate)}
          </TableCell>
          <TableCell className="text-center">
            {modifyEndDate(membership.endDate)}
          </TableCell>
          <TableCell className="text-center">
            {membership.priceAtPurchase}
          </TableCell>
          <TableCell className="text-center">
            {membership.paymentAmount}
          </TableCell>
          <TableCell className="text-right">
            <EditMembership
              startDate={membership.startDate}
              endDate={membership.endDate}
              id={membership.id}
            />
            <DeleteMembership
              id={membership.id}
              price={membership.paymentAmount}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default MembershipTableBody;
