import AdminDetails from "@/components/Dashboard/AdminDetails";
import CustomerBirthday from "@/components/Dashboard/BirthdayStats/CustomerBirthday";
import MembershipsStats from "@/components/Dashboard/MembershipStats/MembershipsStats";
import DailyStats from "@/components/Dashboard/DailyStats/DailyStats";
import YearlyStats from "@/components/Dashboard/YearlyStats";
import Section from "@/components/Layouts/Section";
import UserWithBalance from "@/components/Dashboard/UsersWithbalance/UserWithBalance";
import UserWithProductbalance from "@/components/Dashboard/UserWithProductBalance/UserWithProductbalance";

function Dashboard() {
  return (
    <Section>
      <AdminDetails />
      <YearlyStats />
      <DailyStats />
      <MembershipsStats />
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-2">
        <CustomerBirthday />
        <UserWithBalance />
        <UserWithProductbalance />
      </div>
    </Section>
  );
}

export default Dashboard;
