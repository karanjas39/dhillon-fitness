import MembershipsStats from "@/components/Dashboard/MembershipsStats";
import MonthlyStats from "@/components/Dashboard/MonthlyStats";
import YearlyStats from "@/components/Dashboard/YearlyStats";
import Section from "@/components/Layouts/Section";

function Dashboard() {
  return (
    <Section>
      <YearlyStats />
      <MonthlyStats />
      <MembershipsStats />
    </Section>
  );
}

export default Dashboard;
