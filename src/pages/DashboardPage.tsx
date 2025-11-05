import DashboardStats from "../components/DashboardStats";
import DashboardWeeklyTracker from "../components/DashboardWeeklyTracker";

const DashboardPage = () => {
  return (
    <>
      <DashboardWeeklyTracker />
      <DashboardStats />
    </>
  );
};

export default DashboardPage;