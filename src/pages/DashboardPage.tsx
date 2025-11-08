import DashboardStats from "../components/DashboardStats";
import DashboardWeeklyTracker from "../components/DashboardWeeklyTracker";
import MonthlyWorkoutChart from "../components/MonthlyWorkoutChart";

const DashboardPage = () => {
  return (
    <>
      <DashboardWeeklyTracker />
      <DashboardStats />
      <MonthlyWorkoutChart />
    </>
  );
};

export default DashboardPage;