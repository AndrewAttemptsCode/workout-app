import PageManager from "../pages/PageManager";

type workoutData = {
  workoutIndex: number;
  exerciseIndex: number;
}

export const loadWorkout = async (pm: PageManager, workoutWithExercise: workoutData ) => {
  const { workoutIndex } = workoutWithExercise;

  await pm.workouts().loadWorkout(workoutIndex);
};

export const completeWorkout = async (pm: PageManager) => {
  await pm.timer().startWorkout();
  await pm.timer().completeSet();
  await pm.timer().finishWorkout();
};
