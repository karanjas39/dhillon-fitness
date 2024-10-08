"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Section from "@/components/Layouts/Section";
import { useParams } from "next/navigation";
import CustomerDetail from "@/components/Customer/Details/CustomerDetail";
import { customerApi } from "@/store/api/customerApi";
import Loader from "@/components/Loader/Loader";
import MembershipTable from "@/components/Customer/Details/Memberships/MembershipTable";
import EditCustomerForm from "@/components/Customer/Details/Edit/EditCustomerForm";
import AddMembershipDialog from "@/components/Customer/Details/AddMembership/AddMembershipDialog";
import DeletCustomer from "@/components/Customer/Details/DeleteCustomer";

function CustomerDetails() {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = customerApi.useGetCustomerDetailsQuery({
    id: params.id,
  });

  if (isLoading && !data) return <Loader />;

  return (
    <>
      {data?.success && (
        <Section className="flex flex-col gap-2">
          <div className="flex sm:items-center items-start sm:flex-row flex-col justify-between">
            <h1 className="sm:text-4xl text-3xl font-bold mt-3 mb-3 capitalize">
              {data.customer.name}
            </h1>
            <div className="flex sm:items-center items-end sm:flex-row flex-col gap-2 self-end">
              <AddMembershipDialog id={params.id} />
              <DeletCustomer />
            </div>
          </div>
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="memberships">Memberships</TabsTrigger>
              <TabsTrigger value="editDetail">Edit Details</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <CustomerDetail customer={data.customer} />
            </TabsContent>
            <TabsContent value="memberships">
              <MembershipTable id={params.id} />
            </TabsContent>
            <TabsContent value="editDetail">
              <EditCustomerForm customer={data.customer} />
            </TabsContent>
          </Tabs>
        </Section>
      )}
    </>
  );
}

export default CustomerDetails;
