import AdminDetails from "@/components/Dashboard/AdminDetails";
import CustomerBirthday from "@/components/Dashboard/BirthdayStats/CustomerBirthday";
import MembershipsStats from "@/components/Dashboard/MembershipStats/MembershipsStats";
import DailyStats from "@/components/Dashboard/DailyStats/DailyStats";
import YearlyStats from "@/components/Dashboard/YearlyStats";
import Section from "@/components/Layouts/Section";
import UserWithBalance from "@/components/Dashboard/UsersWithbalance/UserWithBalance";

function Dashboard() {
  return (
    <Section>
      <AdminDetails />
      <YearlyStats />
      <DailyStats />
      <MembershipsStats />
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
        <CustomerBirthday />
        <UserWithBalance />
      </div>
    </Section>
  );
}

export default Dashboard;
