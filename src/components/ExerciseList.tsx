import type { Exercise } from "../pages/ExercisePage";
import ExerciseItem from "./ExerciseItem";

type ExerciseListProps = {
  exercises: Exercise[];
};

const ExerciseList = ({ exercises }: ExerciseListProps) => {
  return (
    <div>
      {exercises.map((exercise) => (
        <ExerciseItem key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
};

export default ExerciseList;
