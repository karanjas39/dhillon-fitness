import AdminDetails from "@/components/Dashboard/AdminDetails";
import CustomerBirthday from "@/components/Dashboard/BirthdayStats/CustomerBirthday";
import MembershipsStats from "@/components/Dashboard/MembershipStats/MembershipsStats";
import MonthlyStats from "@/components/Dashboard/MonthlyStats";
import YearlyStats from "@/components/Dashboard/YearlyStats";
import Section from "@/components/Layouts/Section";

function Dashboard() {
  return (
    <Section>
      <AdminDetails />
      <YearlyStats />
      <MonthlyStats />
      <div className="grid sm:grid-cols-2 grid-col-1 gap-2">
        <MembershipsStats />
        <CustomerBirthday />
      </div>
    </Section>
  );
}

export default Dashboard;
