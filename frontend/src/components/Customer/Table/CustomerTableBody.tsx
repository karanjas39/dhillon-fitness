"use client";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";

function CustomerTableRow() {
  return (
    <TableBody>
      <TableRow>
        <TableCell>Tanveer Singh</TableCell>
        <TableCell>7347587459</TableCell>
        <TableCell>One month Membership</TableCell>
        <TableCell className="text-right">12 August 2024</TableCell>
      </TableRow>
    </TableBody>
  );
}

export default CustomerTableRow;
