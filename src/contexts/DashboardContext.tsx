import { createContext, useContext, useEffect, useState } from "react";
import type { Timer } from "./WorkoutContext";
import { isAfter, nextMonday, startOfDay } from "date-fns";

type Stats = {
  name: string;
  value: number | string;
}

type DaysComplete = {
  day: string;
  complete: boolean;
}

type ResetDates = {
  nextMonday?: string;
  nextYear?: string;
}

type MonthlyWorkoutCount = {
  month: string;
  count: number;
}

type DashboardContextTypes = {
  stats: Stats[];
  daysComplete: DaysComplete[];
  dashWorkoutComplete: (workout: Timer) => void;
  updateDayComplete: () => void;
}

type DashboardProviderProps = {
  children: React.ReactNode;
}

const defaultStats: Stats[] = [
  {
    name: "Last worked out",
    value: "None yet",
  },
  {
    name: "Last workout complete",
    value: "None yet",
  },
  {
    name: "Workouts complete",
    value: 0,
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
    name: "Heaviest weight lifted",
    value: 0,
  },
];

const defaultDaysComplete: DaysComplete[] = [
  {
    day: "Monday",
    complete: false,
  },
  {
    day: "Tuesday",
    complete: false,
  },
  {
    day: "Wednesday",
    complete: false,
  },
  {
    day: "Thursday",
    complete: false,
  },
  {
    day: "Friday",
    complete: false,
  },
  {
    day: "Saturday",
    complete: false,
  },
  {
    day: "Sunday",
    complete: false,
  },
];

const defaultMonthlyWorkoutCount: MonthlyWorkoutCount[] = [
  {
    month: "January",
    count: 0,
  },
  {
    month: "February",
    count: 0,
  },
  {
    month: "March",
    count: 0,
  },
  {
    month: "April",
    count: 0,
  },
  {
    month: "May",
    count: 0,
  },
  {
    month: "June",
    count: 0,
  },
  {
    month: "July",
    count: 0,
  },
  {
    month: "August",
    count: 0,
  },
  {
    month: "September",
    count: 0,
  },
  {
    month: "October",
    count: 0,
  },
  {
    month: "November",
    count: 0,
  },
  {
    month: "December",
    count: 0,
  },
];


const DashboardContext = createContext<DashboardContextTypes | null>(null);

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [stats, setStats] = useState<Stats[]>(() => {
    const savedStats = localStorage.getItem("stats");
    return savedStats ? (JSON.parse(savedStats) as Stats[]) : defaultStats;
  });

  const [daysComplete, setDaysComplete] = useState<DaysComplete[]>(() => {
    const savedDays = localStorage.getItem("daysComplete");
    return savedDays ? (JSON.parse(savedDays) as DaysComplete[]) : defaultDaysComplete;
  });

  const [monthlyWorkoutCount, setMonthlyWorkoutCount] = useState(() => {
    const savedMonthCount = localStorage.getItem("workoutsPerMonth");
    return savedMonthCount ? (JSON.parse(savedMonthCount) as MonthlyWorkoutCount[]) : defaultMonthlyWorkoutCount;
  });

  useEffect(() => {
    localStorage.setItem("stats", JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem("daysComplete", JSON.stringify(daysComplete));
  }, [daysComplete]);

  useEffect(() => {
    const now = new Date();
    
    const storedDates = localStorage.getItem("nextResetDates");
    const resetDates: ResetDates = storedDates ? JSON.parse(storedDates) : {};

    const upcomingMonday = startOfDay(nextMonday(now)).toISOString();
    const upcomingNewYear = new Date(now.getFullYear() + 1, 0, 1).toISOString();

    if (!resetDates.nextMonday || isAfter(now, new Date(resetDates.nextMonday))) {
      resetDates.nextMonday = upcomingMonday;
      setDaysComplete(defaultDaysComplete);
    }

    if (!resetDates.nextYear || isAfter(now, new Date(resetDates.nextYear))) {
      resetDates.nextYear = upcomingNewYear;
    }

    localStorage.setItem("nextResetDates", JSON.stringify(resetDates));

  }, []);

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
        if (stat.name === "Last worked out") {
          return { ...stat, value: new Date().toISOString() };
        }
        if (stat.name === "Last workout complete") {
          return { ...stat, value: workout.workoutTitle};
        }
        if (stat.name === "Workouts complete") {
          return { ...stat, value: Number(stat.value) + 1 };
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

  const updateDayComplete = () => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = new Date().getDay();
    const today = daysOfWeek[dayOfWeek];

    setDaysComplete(prev =>
      prev.map(dayComplete =>
        dayComplete.day === today
        ? { ...dayComplete, complete: true }
        : dayComplete
      )
    );
  };

  return (
    <DashboardContext.Provider value={{ stats, dashWorkoutComplete, daysComplete, updateDayComplete }}>
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