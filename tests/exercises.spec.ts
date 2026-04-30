import { expect } from "@playwright/test";
import { test } from "../test-options";

test.describe("Exercises functionality", () => {
  test("user can add multiple exercises", async ({ pm }) => {
    await pm.nav().goToExercises();

    const exerciseItems = pm.page.getByTestId("exercise-item");
    const numberOfExercises = 3;

    await expect(exerciseItems).toHaveCount(0);

    for (let i = 0; i < numberOfExercises; i++) {
      await pm.exercises().addNewExercise();
    }

    await expect(exerciseItems).toHaveCount(3);
  });

});