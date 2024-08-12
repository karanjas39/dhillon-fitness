"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Section from "@/components/Layouts/Section";
import Loader from "@/components/Loader/Loader";
import { membershipApi } from "@/store/api/membershipApi";
import { useParams } from "next/navigation";
import MembershipDetailCard from "@/components/Memberships/Detail/MembershipDetailCard";
import EditMembership from "@/components/Memberships/EditMembership/EditMembership";

function MembershipDetail() {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = membershipApi.useGetMembershipDetailsQuery({
    id: params.id,
  });

  if (isLoading && !data) return <Loader />;

  return (
    <>
      {data?.success && (
        <Section>
          <h1 className="text-4xl font-bold mt-3 mb-3">
            {data.membership.name}
          </h1>
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="editmemberships">Edit Membership</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <MembershipDetailCard membership={data.membership} />
            </TabsContent>
            <TabsContent value="editmemberships">
              <EditMembership membership={data.membership} />
            </TabsContent>
          </Tabs>
        </Section>
      )}
    </>
  );
}

export default MembershipDetail;
