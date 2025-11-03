import { createContext, useContext, useEffect, useState } from "react";
import type { Timer } from "./WorkoutContext";

type Stats = {
  name: string;
  value: number | string;
}

type DashboardContextTypes = {
  stats: Stats[];
  dashWorkoutComplete: (workout: Timer) => void;
}

type DashboardProviderProps = {
  children: React.ReactNode;
}

const defaultStats: Stats[] = [
  {
    name: "Workouts complete",
    value: 0,
  },
  {
    name: "Last workout complete",
    value: "None yet",
  },
  {
    name: "Exercises complete",
    value: 0,
  },
  {
    name: "Sets complete",
    value: 0,
  },
  {
    name: "Reps complete",
    value: 0,
  },
];


const DashboardContext = createContext<DashboardContextTypes | null>(null);

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [stats, setStats] = useState<Stats[]>(() => {
    const savedStats = localStorage.getItem("stats");
    return savedStats ? (JSON.parse(savedStats) as Stats[] ) : defaultStats;
  });

  useEffect(() => {
    localStorage.setItem("stats", JSON.stringify(stats));
  }, [stats]);
  
  const dashWorkoutComplete = (workout: Timer) => {
    setStats((prev) => (
      prev.map((stat) => {
        if (stat.name === "Workouts complete") {
          return { ...stat, value: Number(stat.value) + 1 };
        }
        if (stat.name === "Last workout complete") {
          return { ...stat, value: workout.workoutTitle};
        }
        if (stat.name === "Exercises complete") {
          return { ...stat, value: Number(stat.value) + workout.exercises.length };
        }
        if (stat.name === "Sets complete") {
          const totalSets = workout.exercises.reduce((acc, exercise) => {
            return acc + (exercise?.sets.length ?? 0);
          }, 0);

          return { ...stat, value: Number(stat.value) + totalSets };
        }
        if (stat.name === "Reps complete") {
          const totalReps = workout.exercises.reduce((acc, exercise) => {
            const exerciseReps = exercise?.sets.reduce((sum, set) => {
              return sum + (set.reps ?? 0);
            }, 0) ?? 0;
            return acc + exerciseReps;
          }, 0);

          return { ...stat, value: Number(stat.value) + totalReps };
        }
        return stat;
      })
    ));
  };

  return (
    <DashboardContext.Provider value={{ stats, dashWorkoutComplete }}>
      {children}
    </DashboardContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be within DashboardProvider");
  return ctx;
}