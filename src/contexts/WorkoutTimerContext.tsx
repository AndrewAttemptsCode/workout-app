import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useWorkout } from "./WorkoutContext";

type WorkoutTimerTypes = {
  startTimer: (seconds: number) => void;
  timerActive: boolean;
  secondsLeft: number;
}

type WorkoutTimerProps = {
  children: React.ReactNode;
}

const WorkoutTimerContext = createContext<WorkoutTimerTypes | null>(null);

export const WorkoutTimerProvider = ({ children }: WorkoutTimerProps) => {
  const [timerActive, setTimerActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const { handleWorkoutTimerComplete } = useWorkout();

  const completeSet = useCallback(() => {
    setTimerActive(false);
    setSecondsLeft(0);
    handleWorkoutTimerComplete();
  }, [handleWorkoutTimerComplete]);

  useEffect(() => {
    if (!timerActive) return;

    if (secondsLeft <= 0) {
      completeSet();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);

  }, [timerActive, secondsLeft, completeSet]);

  const startTimer = (seconds: number) => {
    setSecondsLeft(seconds);
    setTimerActive(true);
  }

  return (
    <WorkoutTimerContext.Provider value={{ startTimer, timerActive, secondsLeft }}>
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

