import { createBrowserRouter } from "react-router-dom";
import WorkoutPage from "../pages/WorkoutPage";
import ExercisePage from "../pages/ExercisePage";
import WorkoutTimerPage from "../pages/WorkoutTimerPage";
import AppLayout from "../components/AppLayout";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    // errorElement: <ErrorBoundary />,
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
    ],
  },
]);

export default routes;
