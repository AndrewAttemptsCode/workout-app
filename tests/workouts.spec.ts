import { expect } from "@playwright/test";
import { test } from "../test-options";

test.describe("Workouts functionality", () => {
  test("user can add multiple workouts", async ({ pm }) => {
    await pm.nav().goToWorkouts();

    const workoutItems = pm.page.getByTestId("workout-item");
    const numberOfWorkouts = 3;

    await expect(workoutItems).toHaveCount(0);
    
    for (let i = 0; i < numberOfWorkouts; i++) {
      await pm.workouts().addNewWorkout();
    }
    
    await expect(workoutItems).toHaveCount(numberOfWorkouts);
  });

  test("user can remove workout from list", async ({ pm }) => {
    await pm.nav().goToWorkouts();

    const workoutItems = pm.page.getByTestId("workout-item");

    await expect(workoutItems).toHaveCount(0);

    await pm.workouts().addNewWorkout();
    await expect(workoutItems).toHaveCount(1);

    await pm.workouts().removeWorkoutAt(0);
    await expect(workoutItems).toHaveCount(0);
  });

  test("workout item has default title", async ({ pm }) => {
    await pm.nav().goToWorkouts();

    await pm.workouts().addNewWorkout();

    const workoutTitle = pm.workouts().getWorkoutTitleInputAt(0);

    await expect(workoutTitle).toHaveValue(/^Workout#/);
  });

  test("user can rename a workout title", async ({ pm }) => {
    await pm.nav().goToWorkouts();

    await pm.workouts().addNewWorkout();

    await pm.workouts().setWorkoutTitle(0, "Upper Body");

    const titleInput = pm.workouts().getWorkoutTitleInputAt(0);
    await expect(titleInput).toHaveValue("Upper Body");
  });

  test("displays fallback workout name when title is empty", async ({ pm }) => {
    await pm.nav().goToWorkouts();

    await pm.workouts().addNewWorkout();

    await pm.workouts().setWorkoutTitle(0, "");

    const titleInput = pm.workouts().getWorkoutTitleInputAt(0);
    
    await expect(titleInput).toBeEmpty();
    
    await titleInput.blur();
    
    await expect(titleInput).toHaveValue(/^Workout#/);
  });

  test("remove workout item button only available in edit mode", async ({ pm }) => {
    await pm.nav().goToWorkouts();

    await pm.workouts().addNewWorkout();

    const workoutItem = pm.workouts().getWorkoutAt(0);
    const removeWorkoutButton = workoutItem.getByRole("button", { name: /remove item/i });

    await pm.workouts().setItemLock(workoutItem, "unlock");
    await expect(removeWorkoutButton).toBeVisible();

    await pm.workouts().setItemLock(workoutItem, "lock");

    await expect(removeWorkoutButton).not.toBeVisible();
  });

  test("display add exercise instructions when workout exercises list is empty", async ({ pm }) => {
    await pm.nav().goToWorkouts();

    await pm.workouts().addNewWorkout();

    const workoutItem = pm.workouts().getWorkoutAt(0);
    await expect(workoutItem).toContainText(/exercise list is currently empty/i);
    // TODO: when exercises pom set up:
    // when exercises added to workout item default message disappears
    // replaces with list of exercises/or add another test for this
  });

  test("Add exercises link navigates to exercises page", async ({ pm }) => {
    await pm.nav().goToWorkouts();

    await pm.workouts().addNewWorkout();

    const workoutItem = pm.workouts().getWorkoutAt(0);
    await pm.workouts().clickAddExercise(workoutItem);

    await expect(pm.page.getByRole("button", { name: /add new exercise/i })).toBeVisible();
  });

  test("total workout exercises count updates", async ({ pm }) => {
    await pm.nav().goToWorkouts();

    await pm.workouts().addNewWorkout();

    const workoutItem = pm.workouts().getWorkoutAt(0);

    await expect(workoutItem).toContainText(/total exercises: 0/i);
    // TODO: when exercise pom set up:
    // update test to check this counter increases/decreases
    // when the exercises in the workout list changes
    // when edit mode locked - count is hidden, replaced with load workout button
    // count is displayed when edit mode unlocked
  });

});
