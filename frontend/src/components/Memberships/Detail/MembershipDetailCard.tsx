import { CardContentDiv } from "@/components/Customer/Details/CustomerDetail";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { modifyDate } from "@/utils/helper";
import { Api_MembershipDetails } from "@/utils/Types/apiTypes";

function MembershipDetailCard({
  membership,
}: Pick<Api_MembershipDetails, "membership">) {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Membership Details</CardTitle>
        <CardDescription>
          Here are the details of this membership
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <CardContentDiv title="Description" value={membership.description} />
        <CardContentDiv title="Price" value={membership.price} />
        <div className="flex items-center justify-between">
          <p className="font-bold">Status</p>
          <p className="text-muted-foreground">
            {!membership.active ? (
              <Badge variant="destructive">Not Active</Badge>
            ) : (
              <Badge variant="constructive">Active</Badge>
            )}
          </p>
        </div>
        <CardContentDiv
          title="Created On"
          value={modifyDate(membership.createdAt)}
        />
        <CardContentDiv
          title="Updated On"
          value={modifyDate(membership.updatedAt)}
        />
      </CardContent>
    </Card>
  );
}

export default MembershipDetailCard;
