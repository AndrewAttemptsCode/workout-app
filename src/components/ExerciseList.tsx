import type { Exercise } from "../pages/ExercisePage";
import ExerciseItem from "./ExerciseItem";

type ExerciseListProps = {
  exercises: Exercise[];
  updateExerciseTitle: (id: string, newTitle: string) => void;
};

const ExerciseList = ({ exercises, updateExerciseTitle }: ExerciseListProps) => {
  return (
    <div>
      {exercises.map((exercise) => (
        <ExerciseItem key={exercise.id} exercise={exercise} updateExerciseTitle={updateExerciseTitle} />
      ))}
    </div>
  );
};

export default ExerciseList;
