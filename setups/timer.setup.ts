import PageManager from "../pages/PageManager";

type workoutData = {
  workoutIndex: number;
  exerciseIndex: number;
}

export const loadWorkout = async (pm: PageManager, workoutWithExercise: workoutData ) => {
  const { workoutIndex } = workoutWithExercise;

  await pm.workouts().loadWorkout(workoutIndex);
};
