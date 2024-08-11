import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

function MembershipTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[200px]">Name</TableHead>
        <TableHead>Description</TableHead>
        <TableHead>Days</TableHead>
        <TableHead>Created On</TableHead>
        <TableHead>Updated On</TableHead>
        <TableHead>Price</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default MembershipTableHeader;
