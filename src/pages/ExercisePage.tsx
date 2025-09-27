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

  const updateExerciseTitle = (id: string, newTitle: string) => {
    setExercises((prev) =>
      prev.map((exercise) =>
        exercise.id === id ? { ...exercise, title: newTitle } : exercise
      )
    );
  };

  const removeExercise = (id: string) => {
    setExercises((prev) =>
      prev.filter((exercise) =>
        exercise.id !== id
      )
    );
  };

  return (
    <div>
      <h1>Exercises</h1>
      <button onClick={addNewExercise}>Add new exercise</button>
      <ExerciseList
        exercises={exercises}
        updateExerciseTitle={updateExerciseTitle}
        removeExercise={removeExercise}
      />
    </div>
  );
};

export default ExercisePage;
