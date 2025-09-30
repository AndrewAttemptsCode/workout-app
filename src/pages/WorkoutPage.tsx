import WorkoutList from "../components/WorkoutList";
import { useWorkout } from "../contexts/WorkoutContext";

const WorkoutPage = () => {
  const { addNewWorkout } = useWorkout();

  return (
    <div>
      <h1>Workouts</h1>
      <button onClick={addNewWorkout}>Add new workout</button>
      <WorkoutList />
    </div>
  );
};

export default WorkoutPage;
