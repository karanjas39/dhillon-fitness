import CustomerTable from "@/components/Customer/Customers";
import Section from "@/components/Layouts/Section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Customer() {
  return (
    <Section>
      <div className="flex items-center justify-between">
        <h1 className="sm:text-2xl text-lg font-bold">Customer Management</h1>
        <Link href="/customer/create">
          <Button>Add Customer</Button>
        </Link>
      </div>
      <CustomerTable />
    </Section>
  );
}

export default Customer;
