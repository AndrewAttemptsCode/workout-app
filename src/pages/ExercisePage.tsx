import { useState } from "react";
import ExerciseList from "../components/ExerciseList";

export type Exercise = {
  id: string;
  title: string;
  sets: { reps: number; weight: number }[];
};

const ExercisePage = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const addNewExercise = () => {
    setExercises((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: "", sets: [{ reps: 0, weight: 0 }] },
    ]);
  };

  return (
    <div>
      <h1>Exercises</h1>
      <button onClick={addNewExercise}>Add new exercise</button>
      <ExerciseList exercises={exercises} />
    </div>
  );
};

export default ExercisePage;
