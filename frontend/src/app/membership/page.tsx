import Section from "@/components/Layouts/Section";
import MembershipTable from "@/components/Memberships/MembershipTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Membership() {
  return (
    <Section>
      <div className="flex items-center justify-between">
        <h1 className="sm:text-2xl text-lg font-bold">Membership Management</h1>
        <Link href="/membership/create">
          <Button>Create Membership Plan</Button>
        </Link>
      </div>
      <MembershipTable />
    </Section>
  );
}

export default Membership;
