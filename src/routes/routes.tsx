import { createBrowserRouter } from "react-router-dom";
import WorkoutPage from "../pages/WorkoutPage";
import ExercisePage from "../pages/ExercisePage";

const routes = createBrowserRouter([
  {
    path: "/workouts",
    element: <WorkoutPage />,
  },
  {
    path: "/exercises",
    element: <ExercisePage />,
  },
]);

export default routes;
