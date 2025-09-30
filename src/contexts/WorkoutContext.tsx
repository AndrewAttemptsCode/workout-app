import { createContext, useContext, useState } from "react";

export type Workout = {
  id: string;
  workoutTitle: string;
  exercises: string[];
};

type WorkoutContextTypes = {
  workouts: Workout[];
  addNewWorkout: () => void;
  updateWorkoutTitle: (workoutId: string, newTitle: string) => void;
  removeWorkoutItem: (workoutId: string) => void;
}

type WorkoutProviderProps = {
  children: React.ReactNode;
}

const WorkoutContext = createContext<WorkoutContextTypes | null>(null);

export const WorkoutProvider = ({ children }: WorkoutProviderProps) => {
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
    <WorkoutContext.Provider value={{ workouts, addNewWorkout, updateWorkoutTitle, removeWorkoutItem }}>
      {children}
    </WorkoutContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWorkout = () => {
  const ctx = useContext(WorkoutContext);
  if (!ctx) throw new Error("useWorkout must be used within WorkoutProvider");
  return ctx;
}
