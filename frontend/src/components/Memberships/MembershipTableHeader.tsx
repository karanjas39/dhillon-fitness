import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

function MembershipTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[300px]">Name</TableHead>
        <TableHead className="text-center">Months</TableHead>
        <TableHead className="text-center">Price</TableHead>
        <TableHead className="text-right">Status</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default MembershipTableHeader;
