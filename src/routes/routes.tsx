import { createBrowserRouter } from "react-router-dom";
import WorkoutPage from "../pages/WorkoutPage";
import ExercisePage from "../pages/ExercisePage";
import WorkoutTimerPage from "../pages/WorkoutTimerPage";
import AppLayout from "../components/AppLayout";
import ErrorBoundary from "../components/ErrorBoundary";
import HomePage from "../pages/HomePage";
import DashboardPage from "../pages/DashboardPage";
import AppLayoutSecondary from "../components/AppLayoutSecondary";

const routes = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    element: <AppLayoutSecondary />,
    children: [
      {
        path: "/workouts",
        element: <WorkoutPage />,
      },
      {
        path: "/exercises",
        element: <ExercisePage />,
      },
      {
        path: "/timer",
        element: <WorkoutTimerPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ], 
  },
]);

export default routes;
