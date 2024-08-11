import { Api_AllMemberships } from "@/utils/Types/apiTypes";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { modifyDate } from "@/utils/helper";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function MembershipTableBody({
  memberships,
}: Pick<Api_AllMemberships, "memberships">) {
  return (
    <TableBody className="w-full">
      {memberships.map((membership) => (
        <TableRow key={membership.id}>
          <TableCell>{membership.name}</TableCell>
          <TableCell>{membership.description}</TableCell>
          <TableCell>{membership.durationDays}</TableCell>
          <TableCell>{modifyDate(membership.createdAt)}</TableCell>
          <TableCell>{modifyDate(membership.updatedAt)}</TableCell>
          <TableCell>{membership.price}</TableCell>
          <TableCell className="text-right flex items-center justify-end gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Pencil1Icon className="cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit membership plan</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <TrashIcon className="cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete membership plan</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default MembershipTableBody;
