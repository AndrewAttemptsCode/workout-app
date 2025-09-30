import { createContext, useContext } from "react";

type WorkoutContextTypes = {

}

type WorkoutProviderProps = {
  children: React.ReactNode;
}

const WorkoutContext = createContext<WorkoutContextTypes | null>(null);

export const WorkoutProvider = ({ children }: WorkoutProviderProps) => {
  return (
    <WorkoutContext.Provider value={}>
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
