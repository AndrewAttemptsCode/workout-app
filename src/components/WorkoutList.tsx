import WorkoutItem from "./WorkoutItem";
import type { Workout } from "../pages/WorkoutPage";

type WorkoutListProps = {
  workouts: Workout[];
  updateWorkoutTitle: (workoutId: string, newTitle: string) => void;
}

const WorkoutList = ({ workouts, updateWorkoutTitle }: WorkoutListProps) => {
  return (
    <div>
      {workouts.map((workout) => (
        <WorkoutItem key={workout.id} workout={workout} updateWorkoutTitle={updateWorkoutTitle} />
      ))}
    </div>
  );
};

export default WorkoutList;
