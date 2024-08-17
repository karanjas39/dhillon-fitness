import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

function MembershipTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[250px]">Membership Plan</TableHead>
        <TableHead className="text-center sm:w-max w-[300px]">
          Starts On
        </TableHead>
        <TableHead className="text-center sm:w-max w-[300px]">
          Expire On
        </TableHead>
        <TableHead className="text-center sm:w-max w-[300px]">
          Actual Price
        </TableHead>
        <TableHead className="text-center sm:w-max w-[300px]">
          Amount Paid
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default MembershipTableHeader;
