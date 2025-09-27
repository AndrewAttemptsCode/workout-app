import { useState } from "react";

type Exercise = {
  id: string;
  title: string;
  sets: { reps: number; weight: number }[];
}

const ExercisePage = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  return (
    <div>
      <h1>Exercises</h1>
    </div>
  );
};

export default ExercisePage;