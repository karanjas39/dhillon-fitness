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
import { Api_UserWithProductBalance } from "@/utils/Types/apiTypes";

import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

function UserWithProductBalanceList({
  users,
}: Pick<Api_UserWithProductBalance, "users">) {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ExternalLinkIcon className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pending Product Payments</DialogTitle>
          <DialogDescription>
            This is the list of customers who have pending product payments.
          </DialogDescription>
        </DialogHeader>
        {users.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Sr. No.</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-right">Product Balance</TableHead>
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
                    {Math.abs(user.productBalance)}
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

export default UserWithProductBalanceList;
