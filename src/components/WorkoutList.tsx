import WorkoutItem from "./WorkoutItem";
import { useWorkout } from "../contexts/WorkoutContext";

const WorkoutList = () => {
  const { workouts } = useWorkout();
  
  return (
    <div>
      {workouts.map((workout) => (
        <WorkoutItem key={workout.id} workout={workout} />
      ))}
    </div>
  );
};

export default WorkoutList;
