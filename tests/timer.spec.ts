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

  test("toggling exercise button expands/collapses exercise set details", async ({ loadWorkout: _, pm }) => {
    const exerciseDetails = await pm.timer().toggleExerciseDetails(0, "expand");

    await expect(exerciseDetails).toBeVisible();

    await pm.timer().toggleExerciseDetails(0, "collapse");

    await expect(exerciseDetails).not.toBeVisible();
  });

  test("start workout button initiates workout", async ({ loadWorkout: _, pm }) => {
    const controls = pm.timer().controls();
    
    await expect(controls).toContainText(/start workout/i);
    
    await pm.timer().startWorkout();

    await expect(controls).toContainText(/complete set/i);
  });

  test("completing current set, updates exercise set display", async ({ loadWorkout: _, pm }) => {
    await pm.timer().startWorkout();

    const exerciseSet = await pm.timer().toggleExerciseDetails(0, "expand");

    await expect(exerciseSet).toContainText(/set not complete/i);

    await pm.timer().completeSet();

    await expect(exerciseSet).toContainText(/set complete/i);
  });

  test("completing set increments exercise sets complete count", async ({ loadWorkout: _, pm }) => {
    await pm.timer().startWorkout();

    const exercise = pm.timer().getExercise(0);

    await expect(exercise).toContainText(/0\/1/i);

    await pm.timer().completeSet();

    await expect(exercise).toContainText(/1\/1/i);
  });

  test("completing exercise increments workout complete count", async ({ loadWorkout: _, pm }) => {
    await pm.timer().startWorkout();

    const workout = pm.timer().getWorkoutMenu();

    await expect(workout).toContainText(/0\/1/i);

    await pm.timer().completeSet();

    await expect(workout).toContainText(/1\/1/i);
  });

  test("completing current set initiates rest display", async ({ loadWorkout: _, pm }) => {
    await pm.timer().startWorkout();

    await pm.timer().completeSet();

    const display = pm.timer().display();

    await expect(display).toContainText(/rest/i);
  });

  test("completing current set disables complete set button whilst rest countdown is active", async ({ loadWorkout: _, pm }) => {
    await pm.timer().startWorkout();

    const completeSetButton = await pm.timer().completeSet();

    await expect(completeSetButton).toHaveAttribute("disabled");
  });

  test("completing workout displays finish workout option", async ({ loadWorkout: _, pm }) => {
    await pm.timer().startWorkout();

    await pm.timer().completeSet();

    const controls = pm.timer().controls();

    await expect(controls).toContainText(/finish workout/i);
  });
});
