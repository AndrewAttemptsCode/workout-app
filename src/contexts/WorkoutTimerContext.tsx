import { createContext, useContext } from "react";

type WorkoutTimerTypes = {

}

type WorkoutTimerProps = {
  children: React.ReactNode;
}

const WorkoutTimerContext = createContext<WorkoutTimerTypes | null>(null);

export const WorkoutTimerProvider = ({ children }: WorkoutTimerProps) => {
  return (
    <WorkoutTimerContext.Provider value={{  }}>
      { children }
    </WorkoutTimerContext.Provider>
  )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWorkoutTimer = () => {
  const ctx = useContext(WorkoutTimerContext);
  if (!ctx) throw new Error("useWorkoutTimer must be within WorkoutTimerProvider");
  return ctx;
}

