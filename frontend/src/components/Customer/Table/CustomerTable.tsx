import { Table, TableCaption } from "@/components/ui/table";
import CustomerTableHeader from "./CustomerTableHeader";
import CustomerTableBody from "./CustomerTableBody";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function CustomerTable() {
  return (
    <div className="mt-4 w-full flex flex-col gap-2">
      <div className="self-end sm:w-[30%] w-[80%]">
        <Input
          className="w-full"
          placeholder="Search by phone number"
          type="text"
        />
      </div>
      <ScrollArea className="h-[500px]  min-h-max max-w-full overflow-x-auto overflow-y-auto mt-2 pr-4">
        <Table className="min-w-[600px] sm:min-w-[800px] md:min-w-[1000px]">
          <TableCaption>A list of all the customers.</TableCaption>
          <CustomerTableHeader />
          <CustomerTableBody />
        </Table>
        <ScrollBar orientation="vertical" />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export default CustomerTable;
