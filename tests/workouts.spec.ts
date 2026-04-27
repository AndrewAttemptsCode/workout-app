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

});
