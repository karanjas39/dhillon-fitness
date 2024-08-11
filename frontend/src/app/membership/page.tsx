import Section from "@/components/Layouts/Section";
import MembershipTable from "@/components/Memberships/MembershipTable";

function Membership() {
  return (
    <Section>
      <h1 className="text-2xl font-bold">Memberships</h1>
      <MembershipTable />
    </Section>
  );
}

export default Membership;
