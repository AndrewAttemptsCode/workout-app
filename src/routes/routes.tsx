import { createBrowserRouter } from "react-router-dom";
import WorkoutPage from "../pages/WorkoutPage";
import ExercisePage from "../pages/ExercisePage";
import WorkoutTimerPage from "../pages/WorkoutTimerPage";
import AppLayout from "../components/AppLayout";
import ErrorBoundary from "../components/ErrorBoundary";
import HomePage from "../pages/HomePage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorBoundary />,
    children: [
    {
      index: true,
      element: <HomePage />,
    },
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
    ],
  },
]);

export default routes;
