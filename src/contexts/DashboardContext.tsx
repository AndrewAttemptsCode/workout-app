import { createContext, useContext, useEffect, useState } from "react";

type Stats = {
  name: string;
  value: number;
}

type DashboardContextTypes = {
  stats: Stats[];
  dashWorkoutComplete: () => void;
}

type DashboardProviderProps = {
  children: React.ReactNode;
}

const defaultStats: Stats[] = [
  {
    name: "Workouts Complete",
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
  
  const dashWorkoutComplete = () => {
    setStats((prev) => (
      prev.map((stat) => (
        stat.name === "Workouts Complete"
        ? { ...stat, value: stat.value + 1 }
        : stat
      ))
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