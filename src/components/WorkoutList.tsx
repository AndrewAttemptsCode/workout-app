import WorkoutItem from "./WorkoutItem";
import type { Workout } from "../pages/WorkoutPage";

type WorkoutListProps = {
  workouts: Workout[];
  updateWorkoutTitle: (index: number, newTitle: string) => void;
}

const WorkoutList = ({ workouts, updateWorkoutTitle }: WorkoutListProps) => {
  return (
    <div>
      {workouts.map((workout, index: number) => (
        <WorkoutItem key={index} index={index} workout={workout} updateWorkoutTitle={updateWorkoutTitle} />
      ))}
    </div>
  );
};

export default WorkoutList;
