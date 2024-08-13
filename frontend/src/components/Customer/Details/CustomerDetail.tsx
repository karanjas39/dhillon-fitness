import { Api_CustomerDetail } from "@/utils/Types/apiTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { modifyDate } from "@/utils/helper";
import { Badge } from "@/components/ui/badge";

function CustomerDetail({ customer }: Pick<Api_CustomerDetail, "customer">) {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Customer Details</CardTitle>
        <CardDescription>Here are the details of customer</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <CardContentDiv title="DOB" value={modifyDate(customer.dob)} />
        <CardContentDiv title="Phone Number" value={customer.phone} />
        <CardContentDiv title="Address" value={customer.address} />
        <div className="flex items-center justify-between">
          <p className="font-bold">Balance</p>
          {customer.balance < 0 ? (
            <Badge variant="destructive">{Math.abs(customer.balance)}</Badge>
          ) : (
            <Badge variant="constructive">{customer.balance}</Badge>
          )}
        </div>
        {customer.email && (
          <CardContentDiv title="Email" value={customer.email} />
        )}
        <CardContentDiv title="Gender" value={customer.sex} />
        <CardContentDiv
          title="Joined On"
          value={modifyDate(customer.createdAt)}
        />
      </CardContent>
    </Card>
  );
}

export function CardContentDiv({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between">
      <p className="font-bold">{title}</p>
      <p className="text-muted-foreground">{value}</p>
    </div>
  );
}

export default CustomerDetail;
