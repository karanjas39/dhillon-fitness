import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

function CustomerTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[200px]">Name</TableHead>
        <TableHead>Phone</TableHead>
        <TableHead>Membership Plan</TableHead>
        <TableHead className="text-right">Status</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default CustomerTableHeader;
