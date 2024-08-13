import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

function CustomerTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[150px]">Serial No.</TableHead>
        <TableHead className="w-[300px]">Customer Name</TableHead>
        <TableHead className="text-center">Plan Expire On</TableHead>
        <TableHead className="text-right">Status</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default CustomerTableHeader;
