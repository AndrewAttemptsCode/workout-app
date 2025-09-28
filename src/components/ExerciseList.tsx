import type { Exercise } from "../pages/ExercisePage";
import ExerciseItem from "./ExerciseItem";

type ExerciseListProps = {
  exercises: Exercise[];
  updateExerciseTitle: (id: string, newTitle: string) => void;
  removeExercise: (id: string) => void;
  updateSetField: (exerciseId: string, setId: string, field: "reps" | "weight" | "rest", value: number) => void;
  addSet: (exerciseId: string) => void;
  removeSet: (exerciseId: string, setId: string) => void;
};

const ExerciseList = ({ exercises, updateExerciseTitle, removeExercise, updateSetField, addSet, removeSet }: ExerciseListProps) => {
  return (
    <div>
      {exercises.map((exercise) => (
        <ExerciseItem key={exercise.id} exercise={exercise} updateExerciseTitle={updateExerciseTitle} removeExercise={removeExercise} updateSetField={updateSetField} addSet={addSet} removeSet={removeSet} />
      ))}
    </div>
  );
};

export default ExerciseList;
