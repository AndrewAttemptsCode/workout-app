import { useWorkout } from "../contexts/WorkoutContext";
import ExerciseItem from "./ExerciseItem";

const ExerciseList = () => {
  const { exercises } = useWorkout(); 

  return (
    <div>
      {exercises.map((exercise) => (
        <ExerciseItem key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
};

export default ExerciseList;
