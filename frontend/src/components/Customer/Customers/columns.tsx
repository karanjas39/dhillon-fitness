"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { isMembershipExpired, modifyEndDate } from "@/utils/helper";
import { customerType } from "@/utils/Types/apiTypes";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

const multiFieldFilter = (row: any, columnId: string, filterValue: string) => {
  if (!filterValue) return true;

  const { name, phone } = row.original;
  const lowerFilterValue = filterValue.toLowerCase();

  return (
    name.toLowerCase().includes(lowerFilterValue) ||
    phone.toLowerCase().includes(lowerFilterValue)
  );
};

export const columns: ColumnDef<customerType>[] = [
  {
    id: "serialNumber",
    header: () => <div className="font-bold">Sr no.</div>,
    cell: ({ row }) => {
      const index = row.index + 1;
      if (index <= 9) return `00${index}`;
      else if (index <= 99) return `0${index}`;
      else return index;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: (info) => info.getValue(),
    meta: { hidden: true },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-bold"
          >
            Customer Name
            {column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.name}</div>
    ),
    filterFn: multiFieldFilter,
  },
  {
    accessorKey: "address",
    header: () => <div className="text-center font-bold">Address</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center capitalize">{row.original.address}</div>
      );
    },
  },
  {
    accessorKey: "expiryDate",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-bold"
        >
          Plan Expires on
          {column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      if (!row.original.memberships.length)
        return (
          <div className="text-center">
            <div className="text-center">No active plan</div>
          </div>
        );

      const expiryDate = modifyEndDate(row.original.memberships[0].endDate);
      return <div className="text-center">{expiryDate}</div>;
    },
    accessorFn: (row) => {
      const defaultDate = new Date("9999-12-31").getTime();
      return row.memberships.length
        ? new Date(row.memberships[0].endDate).getTime()
        : defaultDate;
    },
    sortingFn: (a, b) => {
      const defaultDate = new Date("9999-12-31").getTime();
      const aDate = a.original.memberships.length
        ? new Date(a.original.memberships[0].endDate).getTime()
        : defaultDate;
      const bDate = b.original.memberships.length
        ? new Date(b.original.memberships[0].endDate).getTime()
        : defaultDate;
      return aDate - bDate;
    },
    enableSorting: true,
  },
  {
    accessorKey: "memberships",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-bold"
        >
          Status
          {column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      if (!row.original.memberships.length)
        return (
          <div className="text-center">
            <Badge>New</Badge>
          </div>
        );

      const isExpired = isMembershipExpired(
        row.original.memberships[0].endDate
      );
      return (
        <div className="text-center">
          <Badge variant={isExpired ? "destructive" : "constructive"}>
            {isExpired ? "Expired" : "Live"}
          </Badge>
        </div>
      );
    },
    accessorFn: (row) => {
      return row.memberships.length
        ? isMembershipExpired(row.memberships[0].endDate)
          ? "Expired"
          : "Live"
        : "New";
    },
    sortingFn: (a, b) => {
      const statusOrder = { New: 0, Live: 1, Expired: 2 };
      const aStatus = a.original.memberships.length
        ? isMembershipExpired(a.original.memberships[0].endDate)
          ? "Expired"
          : "Live"
        : "New";
      const bStatus = b.original.memberships.length
        ? isMembershipExpired(b.original.memberships[0].endDate)
          ? "Expired"
          : "Live"
        : "New";
      return statusOrder[aStatus] - statusOrder[bStatus];
    },
    enableSorting: true,
  },
  {
    accessorKey: "active",
    header: () => <div className="text-right font-bold">Active status</div>,
    cell: ({ row }) => {
      const isActive = row.original.active;
      return (
        <div className="text-right">
          <Badge variant={!isActive ? "destructive" : "constructive"}>
            {!isActive ? "Inactive" : "Active"}
          </Badge>
        </div>
      );
    },
  },
];
