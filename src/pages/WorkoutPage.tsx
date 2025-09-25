import { useState } from "react";
import WorkoutList from "../components/WorkoutList";

export type Workout = {
  workoutTitle: string;
  exercises: string[];
}

const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const addNewWorkout = () => {
    setWorkouts((prev) => [...prev, { workoutTitle: "", exercises: [] }]);
  };

  const updateWorkoutTitle = (index: number, newTitle: string) => {
    setWorkouts((prev) =>
      prev.map((workout, i) =>
        i === index ? { ...workout, workoutTitle: newTitle } : workout
      )
    );
  };

  return (
    <div>
      <h1>Workouts</h1>
      <button onClick={addNewWorkout}>Add new workout</button>
      <WorkoutList
        workouts={workouts}
        updateWorkoutTitle={updateWorkoutTitle}
      />
    </div>
  );
};

export default WorkoutPage;
