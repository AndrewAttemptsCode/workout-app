import { createContext, useContext, useEffect, useState } from "react";
import type { Timer } from "./WorkoutContext";

type Stats = {
  name: string;
  value: number | string | Date;
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
  {
    name: "Last worked out",
    value: "None yet",
  },
  {
    name: "Heaviest weight lifted",
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

  useEffect(() => {
    if (defaultStats.length !== stats.length) {
        
      setStats((prev) => {

        const filtered = prev.filter(
          (stat) => defaultStats.some((defaultStat) => defaultStat.name === stat.name)
        );

        const missingStats = defaultStats.filter(
          (defaultStat) => !filtered.some((stat) => stat.name === defaultStat.name)
        );

        return [...filtered, ...missingStats];
      });
    };
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
        if (stat.name === "Last worked out") {
          return { ...stat, value: new Date() };
        }
        if (stat.name === "Heaviest weight lifted") {
          const weight = workout.exercises.reduce((acc, exercise) => {
            const heaviest = exercise?.sets.reduce((accWeight, set) => {
              return Math.max(accWeight, set.weight ?? 0);
            }, 0) ?? 0;
            return Math.max(acc, heaviest);
          }, 0);

          return { ...stat, value: Math.max(Number(stat.value), weight) };
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