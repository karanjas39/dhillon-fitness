import { Table, TableCaption } from "@/components/ui/table";
import CustomerTableHeader from "./CustomerTableHeader";
import CustomerTableBody from "./CustomerTableBody";

function CustomerTable() {
  return (
    <div className="mt-4 w-full">
      <Table>
        <TableCaption>A list of all the customers.</TableCaption>
        <CustomerTableHeader />
        <CustomerTableBody />
      </Table>
    </div>
  );
}

export default CustomerTable;
