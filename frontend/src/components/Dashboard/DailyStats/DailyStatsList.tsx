import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Api_DailyStatType } from "@/utils/Types/apiTypes";

import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

function DailyStatsList({
  dailyIncome,
}: Pick<Api_DailyStatType, "dailyIncome">) {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ExternalLinkIcon className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Today's Sales</DialogTitle>
          <DialogDescription>
            This is the list of fees received today.
          </DialogDescription>
        </DialogHeader>
        {dailyIncome.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Sr. No.</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Address</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dailyIncome.map((income, i) => (
                <TableRow
                  className="cursor-pointer"
                  onClick={() =>
                    router.push(`/customer/detail/${income.user.id}`)
                  }
                  key={income.user.id}
                >
                  <TableCell className="text-left">{i + 1}.</TableCell>
                  <TableCell className="text-center capitalize">
                    {income.user.name}
                  </TableCell>
                  <TableCell className="text-center capitalize">
                    {income.user.address}
                  </TableCell>
                  <TableCell className="text-right">
                    {Math.abs(income.paymentAmount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

export default DailyStatsList;
