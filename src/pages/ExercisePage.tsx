import { useState } from "react";
import ExerciseList from "../components/ExerciseList";

export type Exercise = {
  id: string;
  title: string;
  sets: { id: string; reps: number; weight: number, rest: number }[];
};

const ExercisePage = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const addNewExercise = () => {
    setExercises((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: "", sets: [{ id: crypto.randomUUID() ,reps: 5, weight: 5, rest: 30 }] },
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

  const updateSetField = (exerciseId: string, setId: string, field: "reps" | "weight" | "rest", value: number) => {
    setExercises((prev) =>
      prev.map((exercise) =>
        exercise.id === exerciseId
        ? {
          ...exercise,
          sets: exercise.sets.map((set) =>
            set.id === setId
            ? {...set, [field]: value}
            : set
          )
        }
        : exercise
      )
    );
  };

  const addSet = (exerciseId: string) => {
    setExercises((prev) =>
      prev.map((exercise) =>
        exercise.id === exerciseId
        ? {
          ...exercise,
          sets: [
            ...exercise.sets,
            {
              id: crypto.randomUUID(),
              reps: 5,
              weight: 5,
              rest: 30,
            },
          ],
        }
        : exercise
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
        updateSetField={updateSetField}
        addSet={addSet}
      />
    </div>
  );
};

export default ExercisePage;
