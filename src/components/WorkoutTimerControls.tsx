import { useWorkout } from "../contexts/WorkoutContext";

const WorkoutTimerControls = () => {
  const { handleWorkoutTimerComplete } = useWorkout();
  
  return (
    <button onClick={handleWorkoutTimerComplete}>Complete</button>
  );
};

export default WorkoutTimerControls;