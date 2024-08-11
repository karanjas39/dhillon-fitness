import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

function MembershipTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[250px]">Membership Plan</TableHead>
        <TableHead>Start Date</TableHead>
        <TableHead>End Date</TableHead>
        <TableHead>Actual Price</TableHead>
        <TableHead className="text-right">Amount Paid</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default MembershipTableHeader;
