import AdminDetails from "@/components/Dashboard/AdminDetails";
import CustomerBirthday from "@/components/Dashboard/BirthdayStats/CustomerBirthday";
import MembershipsStats from "@/components/Dashboard/MembershipStats/MembershipsStats";
import DailyStats from "@/components/Dashboard/DailyStats/DailyStats";
import YearlyStats from "@/components/Dashboard/YearlyStats";
import Section from "@/components/Layouts/Section";

function Dashboard() {
  return (
    <Section>
      <AdminDetails />
      <YearlyStats />
      <DailyStats />
      <div className="grid sm:grid-cols-2 grid-col-1 gap-2">
        <MembershipsStats />
        <CustomerBirthday />
      </div>
    </Section>
  );
}

export default Dashboard;
