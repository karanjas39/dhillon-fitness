import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

function MembershipTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[250px]">Membership Plan</TableHead>
        <TableHead className="w-[200px]">Start Date</TableHead>
        <TableHead className="w-[200px]">End Date</TableHead>
        <TableHead>Actual Price</TableHead>
        <TableHead className="text-right">Amount Paid</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default MembershipTableHeader;
