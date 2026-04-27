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

});
