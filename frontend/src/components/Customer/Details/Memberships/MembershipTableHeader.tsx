import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

function MembershipTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[250px]">Membership Plan</TableHead>
        <TableHead className="text-center">Start Date</TableHead>
        <TableHead className="text-center">End Date</TableHead>
        <TableHead className="text-center">Actual Price</TableHead>
        <TableHead className="text-right">Amount Paid</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default MembershipTableHeader;
