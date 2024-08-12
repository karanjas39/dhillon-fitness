import Section from "@/components/Layouts/Section";
import CreateMembershipForm from "@/components/Memberships/Create/CreateMembershipForm";

function CreateMembership() {
  return (
    <Section>
      <div>
        <h1 className="text-lg sm:text-2xl font-bold">
          Create Membership Plan
        </h1>
        <CreateMembershipForm />
      </div>
    </Section>
  );
}

export default CreateMembership;
