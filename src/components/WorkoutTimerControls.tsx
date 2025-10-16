import { useWorkout } from "../contexts/WorkoutContext";

const WorkoutTimerControls = () => {
  const { handleWorkoutTimerComplete, workoutTimer } = useWorkout();

  return (
    <button onClick={handleWorkoutTimerComplete}>{workoutTimer?.complete ? "Finish" : "Complete"}</button>
  );
};

export default WorkoutTimerControls;