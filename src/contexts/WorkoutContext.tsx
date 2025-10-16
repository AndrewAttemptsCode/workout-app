import { createContext, useContext, useEffect, useState } from "react";
import shortUuid from "../utils/shortUuid";

export type Workout = {
  id: string;
  workoutTitle: string;
  exercises: string[];
  editStatus: boolean;
};

export type Exercise = {
  id: string;
  title: string;
  sets: { id: string; reps: number | null; weight: number | null; rest: number | null }[];
  editStatus: boolean;
};

export type Timer = {
  workoutId: string;
  workoutTitle: string;
  complete: boolean;
  exercises: ({
    id: string;
    title: string;
    complete: boolean;
    sets: {
      id: string;
      reps: number | null;
      weight: number | null;
      rest: number | null;
      complete: boolean;
    }[];
  } | null)[];
}

type WorkoutContextTypes = {
  workouts: Workout[];
  exercises: Exercise[];
  addNewWorkout: () => void;
  updateWorkoutTitle: (workoutId: string, newTitle: string) => void;
  removeWorkoutItem: (workoutId: string) => void;
  addNewExercise: () => void;
  updateExerciseTitle: (id: string, newTitle: string) => void;
  removeExercise: (id: string) => void;
  updateSetField: (exerciseId: string, setId: string, field: "reps" | "weight" | "rest", value: number | null) => void;
  addSet: (exerciseId: string) => void;
  removeSet: (exerciseId: string, setId: string) => void;
  updateWorkoutEditMode: (workoutId: string, editMode: boolean) => void;
  updateExerciseEditMode: (exerciseId: string, editMode: boolean) => void;
  addExerciseToWorkout: (workoutId: string, exerciseId: string) => void;
  removeExerciseFromWorkout: (workoutId: string, exerciseIndex: number) => void;
  startWorkoutTimer: (workoutId: string) => void;
  workoutTimer: Timer | null;
  handleWorkoutTimerComplete: () => void;
}

type WorkoutProviderProps = {
  children: React.ReactNode;
}

const WorkoutContext = createContext<WorkoutContextTypes | null>(null);

export const WorkoutProvider = ({ children }: WorkoutProviderProps) => {
  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    const savedWorkouts = localStorage.getItem("workouts");
    return savedWorkouts ? (JSON.parse(savedWorkouts) as Workout[]) : [];
  });

  const [exercises, setExercises] = useState<Exercise[]>(() => {
    const savedExercises = localStorage.getItem("exercises");
    return savedExercises ? (JSON.parse(savedExercises) as Exercise[]) : [];
  });

  const [workoutTimer, setWorkoutTimer] = useState<Timer | null>(null);
  
  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem("exercises", JSON.stringify(exercises));
  }, [exercises]);

  // Timer

  const startWorkoutTimer = (workoutId: string) => {
    const workout = workouts.find((workout) => workout.id === workoutId);
    if (!workout) return;

    const timerExercises = workout.exercises.map((exerciseId) => {
      const exercise = exercises.find((exercise) => exercise.id === exerciseId);
      if (!exercise) return null;

      return {
        id: exerciseId,
        title: exercise.title,
        complete: false,
        sets: exercise.sets.map((set) => ({
          id: set.id,
          reps: set.reps,
          weight: set.weight,
          rest: set.rest,
          complete: false,
        }))
      }
    })

    setWorkoutTimer({
      workoutId,
      workoutTitle: workout.workoutTitle,
      exercises: timerExercises,
      complete: false,
    });

    console.log(workoutTimer);
  }

const handleWorkoutTimerComplete = () => {
  setWorkoutTimer(prev => {
    if (!prev) return prev;

    let foundSetToComplete = false;

    const updatedExercises = prev.exercises.map(exercise => {
      if (!exercise) return exercise;
      if (foundSetToComplete) return exercise;
      if (exercise?.complete) return exercise;

      const updatedSets = exercise?.sets.map(set => {
        if (!set.complete && !foundSetToComplete) {
          foundSetToComplete = true;
          return { ...set, complete: true };
        }
        return set;
      });

      const allSetsComplete = updatedSets?.every(set => set.complete);

      return {
        ...exercise,
        sets: updatedSets,
        complete: allSetsComplete,
      };
    });

    const allExercisesComplete = updatedExercises.every(exercise => exercise?.complete);

    return {
      ...prev,
      exercises: updatedExercises,
      complete: allExercisesComplete,
    };

  });
};

  // Workouts

  const addNewWorkout = () => {
    setWorkouts((prev) => [
      ...prev,
      { id: shortUuid(), workoutTitle: `Workout#${shortUuid()}`, exercises: [], editStatus: true },
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

  const updateWorkoutEditMode = (workoutId: string, editMode: boolean) => {
    setWorkouts((prev) =>
      prev.map((workout) =>
        workout.id === workoutId
        ? { ...workout, editStatus: editMode }
        : workout
      )
    );
  };

  const removeExerciseFromWorkout = (workoutId: string, exerciseIndex: number) => {
    setWorkouts((prev) =>
      prev.map((workout) =>
        workout.id === workoutId
        ? {
          ...workout,
          exercises: workout.exercises.filter((_, index) =>
            index !== exerciseIndex
          )
        }
        : workout
      )
    );
  };

  // Exercises

  const addNewExercise = () => {
    setExercises((prev) => [
      ...prev,
      { id: shortUuid(), title: `Exercise#${shortUuid()}`, sets: [{ id: shortUuid() ,reps: 5, weight: 5, rest: 30 }], editStatus: true },
    ]);
  };

  const updateExerciseEditMode = (exerciseId: string, editMode: boolean) => {
    setExercises((prev) =>
      prev.map((exercise) =>
        exercise.id === exerciseId
        ? { ...exercise, editStatus: editMode }
        : exercise
      )
    );
  };

  const updateExerciseTitle = (id: string, newTitle: string) => {
    setExercises((prev) =>
      prev.map((exercise) =>
        exercise.id === id ? { ...exercise, title: newTitle } : exercise
      )
    );
  };

  const removeExercise = (id: string) => {
    setExercises((prev) =>
      prev.filter((exercise) =>
        exercise.id !== id
      )
    );

    setWorkouts((prev) =>
      prev.map((workout) =>
        ({...workout,
          exercises: workout.exercises?.filter((exercise) =>
          exercise !== id) || []
        }))
    );
  };

  const updateSetField = (exerciseId: string, setId: string, field: "reps" | "weight" | "rest", value: number | null) => {
    setExercises((prev) =>
      prev.map((exercise) =>
        exercise.id === exerciseId
        ? {
          ...exercise,
          sets: exercise.sets.map((set) =>
            set.id === setId
            ? {...set, [field]: value}
            : set
          )
        }
        : exercise
      )
    );
  };

  const addSet = (exerciseId: string) => {
    setExercises((prev) =>
      prev.map((exercise) =>
        exercise.id === exerciseId
        ? {
          ...exercise,
          sets: [
            ...exercise.sets,
            {
              id: shortUuid(),
              reps: 5,
              weight: 5,
              rest: 30,
            },
          ],
        }
        : exercise
      )
    );
  };

  const addExerciseToWorkout = (workoutId: string, exerciseId: string) => {
    setWorkouts((prev) =>
      prev.map((workout) =>
        workout.id === workoutId
        ? {
          ...workout,
          exercises: [...workout.exercises, exerciseId]
        }
        :
        workout
      )
    );
  };

  const removeSet= (exerciseId: string, setId: string) => {
    setExercises((prev) =>
      prev.map((exercise) => 
        exercise.id === exerciseId
        ? {
          ...exercise,
          sets: exercise.sets.filter((set) =>
            set.id !== setId
          )
        }
        : exercise
      )
    );
  };

  return (
    <WorkoutContext.Provider value={{ workouts, exercises, addNewWorkout, updateWorkoutTitle, removeWorkoutItem, addNewExercise, updateExerciseTitle, removeExercise, updateSetField, addSet, removeSet, updateExerciseEditMode, addExerciseToWorkout, updateWorkoutEditMode, removeExerciseFromWorkout, startWorkoutTimer, workoutTimer, handleWorkoutTimerComplete }}>
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
