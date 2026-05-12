import { expect } from "@playwright/test";
import { test } from "../test-options";

test.describe("Timer page functionality", () => {
  test("display shows current exercise set details", async ({ loadWorkout: _, pm }) => {
    const timerDisplay = pm.timer().display();

    await expect(timerDisplay).toContainText(/shoulder press/i);
    await expect(timerDisplay).toContainText(/reps: 5/i);
    await expect(timerDisplay).toContainText(/weight: 5/i);
  });

  test("workout menu expands/collapses exercise list", async ({ loadWorkout: _, pm }) => {
    const workoutMenu = pm.timer().getWorkoutMenu();
    const exerciseList = pm.timer().getExerciseList();

    await expect(workoutMenu).toHaveAttribute("aria-expanded", "true");
    await expect(exerciseList).toBeVisible();

    await pm.timer().toggleExerciseList("collapse");

    await expect(workoutMenu).toHaveAttribute("aria-expanded", "false");
    await expect(exerciseList).not.toBeVisible();
  });
});
