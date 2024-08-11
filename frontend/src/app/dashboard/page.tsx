import MonthlyStats from "@/components/Dashboard/MonthlyStats";
import YearlyStats from "@/components/Dashboard/YearlyStats";
import Section from "@/components/Layouts/Section";

function Dashboard() {
  return (
    <Section>
      <YearlyStats />
      <MonthlyStats />
    </Section>
  );
}

export default Dashboard;
