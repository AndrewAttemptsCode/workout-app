import { createContext, useContext, useEffect, useState } from "react";

type Stats = {
  name: string;
  value: number | string;
}

type DashboardContextTypes = {
  stats: Stats[];
  dashWorkoutComplete: (workoutTitle: string) => void;
}

type DashboardProviderProps = {
  children: React.ReactNode;
}

const defaultStats: Stats[] = [
  {
    name: "Workouts Complete",
    value: 0,
  },
  {
    name: "Last workout complete",
    value: "None yet",
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
  
  const dashWorkoutComplete = (workoutTitle: string) => {
    setStats((prev) => (
      prev.map((stat) => {
        if (stat.name === "Workouts Complete") {
          return { ...stat, value: Number(stat.value) + 1 };
        }
        if (stat.name === "Last workout complete") {
          return { ...stat, value: workoutTitle};
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