import { createBrowserRouter } from "react-router-dom";
import WorkoutPage from "../pages/WorkoutPage";

const routes = createBrowserRouter([
  {
    path: "/workouts",
    element: <WorkoutPage />,
  }
])

export default routes;
