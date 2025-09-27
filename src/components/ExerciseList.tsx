import type { Exercise } from "../pages/ExercisePage";
import ExerciseItem from "./ExerciseItem";

type ExerciseListProps = {
  exercises: Exercise[];
  updateExerciseTitle: (id: string, newTitle: string) => void;
  removeExercise: (id: string) => void;
};

const ExerciseList = ({ exercises, updateExerciseTitle, removeExercise }: ExerciseListProps) => {
  return (
    <div>
      {exercises.map((exercise) => (
        <ExerciseItem key={exercise.id} exercise={exercise} updateExerciseTitle={updateExerciseTitle} removeExercise={removeExercise} />
      ))}
    </div>
  );
};

export default ExerciseList;
