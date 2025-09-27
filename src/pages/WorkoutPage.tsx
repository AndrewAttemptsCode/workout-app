import { useState } from "react";
import WorkoutList from "../components/WorkoutList";

export type Workout = {
  id: string;
  workoutTitle: string;
  exercises: string[];
};

const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const addNewWorkout = () => {
    setWorkouts((prev) => [
      ...prev,
      { id: crypto.randomUUID(), workoutTitle: "", exercises: [] },
    ]);
  };

  const updateWorkoutTitle = (workoutId: string, newTitle: string) => {
    setWorkouts((prev) =>
      prev.map((workout) =>
        workout.id === workoutId
          ? { ...workout, workoutTitle: newTitle }
          : workout
      )
    );
  };

  const removeWorkoutItem = (workoutId: string) => {
    setWorkouts((prev) => prev.filter((workout) => workout.id !== workoutId));
  };

  return (
    <div>
      <h1>Workouts</h1>
      <button onClick={addNewWorkout}>Add new workout</button>
      <WorkoutList
        workouts={workouts}
        updateWorkoutTitle={updateWorkoutTitle}
        removeWorkoutItem={removeWorkoutItem}
      />
    </div>
  );
};

export default WorkoutPage;
