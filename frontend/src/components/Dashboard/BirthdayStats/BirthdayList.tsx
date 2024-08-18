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
import { modifyDate } from "@/utils/helper";
import { Api_CustomerBirthdayStatType } from "@/utils/Types/apiTypes";

import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

function BirthdayList({
  birthdays,
}: Pick<Api_CustomerBirthdayStatType, "birthdays">) {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ExternalLinkIcon className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Todays Birthdays</DialogTitle>
          <DialogDescription>
            This is the list of customers having birthday today.
          </DialogDescription>
        </DialogHeader>
        {birthdays.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Sr. No.</TableHead>
                <TableHead className="text-center">DOB</TableHead>
                <TableHead className="text-right">Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {birthdays.map((birthday, i) => (
                <TableRow
                  className="cursor-pointer"
                  onClick={() => router.push(`/customer/detail/${birthday.id}`)}
                >
                  <TableCell className="text-left">{i + 1}.</TableCell>
                  <TableCell className="text-center">
                    {modifyDate(birthday.dob)}
                  </TableCell>
                  <TableCell className="text-right capitalize">
                    {birthday.name}
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

export default BirthdayList;
