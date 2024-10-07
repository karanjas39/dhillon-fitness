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
import { Api_UserWithBalance } from "@/utils/Types/apiTypes";

import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

function UserWithBalanceList({ users }: Pick<Api_UserWithBalance, "users">) {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ExternalLinkIcon className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pending Payments</DialogTitle>
          <DialogDescription>
            This is the list of customers who have pending balance.
          </DialogDescription>
        </DialogHeader>
        {users.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Sr. No.</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, i) => (
                <TableRow
                  className="cursor-pointer"
                  onClick={() => router.push(`/customer/detail/${user.id}`)}
                  key={user.id}
                >
                  <TableCell className="text-left">{i + 1}.</TableCell>
                  <TableCell className="text-center capitalize">
                    {user.name}
                  </TableCell>
                  <TableCell className="text-right">
                    {Math.abs(user.balance)}
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

export default UserWithBalanceList;
