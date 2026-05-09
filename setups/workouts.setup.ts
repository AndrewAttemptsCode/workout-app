import PageManager from "../pages/PageManager";

export const workoutWithExercise = async (pm: PageManager) => {
  await pm.nav().goToWorkouts();
  await pm.workouts().addNewWorkout();
  await pm.workouts().setWorkoutTitle(0, "upper body");

  await pm.nav().goToExercises();
  await pm.exercises().addNewExercise();
  await pm.exercises().setExerciseTitle(0, "shoulder press");

  await pm.exercises().addExerciseToWorkout(0, 0);

  await pm.nav().goToWorkouts();

  return {
    workoutIndex: 0,
    exerciseIndex: 0
  };
};
