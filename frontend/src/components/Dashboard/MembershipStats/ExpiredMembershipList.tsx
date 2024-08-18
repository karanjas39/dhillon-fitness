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
import { Api_MembershipStat } from "@/utils/Types/apiTypes";

import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

function ExpiredMembershipList({
  expired,
}: Pick<Api_MembershipStat, "expired">) {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ExternalLinkIcon className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Expired Memberships</DialogTitle>
          <DialogDescription>
            This is the list of customers whose membership is expired.
          </DialogDescription>
        </DialogHeader>
        {expired.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Sr. No.</TableHead>
                <TableHead className="text-right">Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expired.map((exp, i) => (
                <TableRow
                  className="cursor-pointer"
                  onClick={() => router.push(`/customer/detail/${exp.user.id}`)}
                >
                  <TableCell className="text-left">{i + 1}.</TableCell>
                  <TableCell className="text-right capitalize">
                    {exp.user.name}
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

export default ExpiredMembershipList;
