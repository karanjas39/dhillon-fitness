import CreateCustomerForm from "@/components/Customer/CreateCustomerForm/CreateCustomerForm";
import Section from "@/components/Layouts/Section";

function CreateCustomer() {
  return (
    <Section>
      <div>
        <h1 className="text-lg sm:text-2xl font-bold">Add new Customer</h1>
      </div>
      <CreateCustomerForm />
    </Section>
  );
}

export default CreateCustomer;
