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

  test("user can remove exercise from list", async ({ pm }) => {
    await pm.nav().goToExercises();

    const exerciseItems = pm.page.getByTestId("exercise-item");

    await expect(exerciseItems).toHaveCount(0);

    await pm.exercises().addNewExercise();
    await expect(exerciseItems).toHaveCount(1);

    await pm.exercises().removeExerciseAt(0);
    await expect(exerciseItems).toHaveCount(0);
  });

  test("exercise item has default title", async ({ pm }) => {
    await pm.nav().goToExercises();

    await pm.exercises().addNewExercise();

    const exerciseTitle = pm.exercises().getExerciseTitleInputAt(0);

    await expect(exerciseTitle).toHaveValue(/^Exercise#/);
  });

  test("user can rename an exercise item", async ({ pm }) => {
    await pm.nav().goToExercises();

    await pm.exercises().addNewExercise();

    const exerciseTitle = pm.exercises().getExerciseTitleInputAt(0);
    await expect(exerciseTitle).toHaveValue(/^Exercise#/);

    await pm.exercises().setExerciseTitle(0, "Overhead press");
    await expect(exerciseTitle).toHaveValue("Overhead press");
  });

  test("displays fallback exercise name when title is empty", async ({ pm }) => {
    await pm.nav().goToExercises();

    await pm.exercises().addNewExercise();

    const exerciseTitle = pm.exercises().getExerciseTitleInputAt(0);
    await expect(exerciseTitle).toHaveValue(/^Exercise#/);

    await pm.exercises().setExerciseTitle(0, "");

    await expect(exerciseTitle).toBeEmpty();

    await exerciseTitle.blur();

    await expect(exerciseTitle).toHaveValue(/^Exercise#/);
  });

  test("remove exercise item button only available in edit mode", async ({ pm }) => {
    await pm.nav().goToExercises();

    await pm.exercises().addNewExercise();

    const exerciseItem = pm.exercises().getExerciseAt(0);
    const removeExerciseButton = exerciseItem.getByRole("button", { name: /remove item/i });

    await pm.exercises().setItemLock(exerciseItem, "unlock");
    await expect(removeExerciseButton).toBeVisible();

    await pm.exercises().setItemLock(exerciseItem, "lock");
    await expect(removeExerciseButton).not.toBeVisible();
  });

  test("add additional exercise set button only available in edit mode", async ({ pm }) => {
    await pm.nav().goToExercises();

    await pm.exercises().addNewExercise();

    const exerciseItem = pm.exercises().getExerciseAt(0);
    const addSetButton = exerciseItem.getByRole("button", { name: /add new set/i });

    await pm.exercises().setItemLock(exerciseItem, "unlock");
    await expect(addSetButton).toBeVisible();

    await pm.exercises().setItemLock(exerciseItem, "lock");
    await expect(addSetButton).not.toBeVisible();
  });

  test("remove exercise set button only available in edit mode", async ({ pm }) => {
    await pm.nav().goToExercises();

    await pm.exercises().addNewExercise();

    const exerciseItem = pm.exercises().getExerciseAt(0);
    const removeSetButton = exerciseItem.getByRole("button", { name: /remove set from exercise/i });

    await pm.exercises().setItemLock(exerciseItem, "unlock");
    await expect(removeSetButton).toBeVisible();

    await pm.exercises().setItemLock(exerciseItem, "lock");
    await expect(removeSetButton).not.toBeVisible();
  });

  test("display total exercise sets in edit mode", async ({ pm }) => {
    await pm.nav().goToExercises();

    await pm.exercises().addNewExercise();

    const exerciseItem = pm.exercises().getExerciseAt(0);
    const setsDisplayCount = pm.exercises().totalSetsDisplayCount(exerciseItem);

    await expect(setsDisplayCount).toContainText("1");

    await pm.exercises().setItemLock(exerciseItem, "unlock");
    await expect(setsDisplayCount).toBeVisible();

    await pm.exercises().setItemLock(exerciseItem, "lock");
    await expect(setsDisplayCount).not.toBeVisible();
  });

  test("exercise item total sets display updates on new set added", async ({ pm }) => {
    await pm.nav().goToExercises();

    await pm.exercises().addNewExercise();

    const exerciseItem = pm.exercises().getExerciseAt(0);
    const setsDisplayCount = pm.exercises().totalSetsDisplayCount(exerciseItem);

    await expect(setsDisplayCount).toContainText("1");

    await pm.exercises().addSetAt(0);
    await expect(setsDisplayCount).toContainText("2");
  });

  test("exercise item has an initial default exercise set", async ({ pm }) => {
    await pm.nav().goToExercises();

    await pm.exercises().addNewExercise();

    const setCount = pm.exercises().getExerciseSetsAt(0);
    
    await expect(setCount).toHaveCount(1);
  });

  test("user can add multiple sets to an exercise item", async ({ pm }) => {
    await pm.nav().goToExercises();

    await pm.exercises().addNewExercise();

    const setCount = pm.exercises().getExerciseSetsAt(0);
    
    await expect(setCount).toHaveCount(1);

    const numberOfSets = 4;

    for (let i = 0; i< numberOfSets; i++) {
      await pm.exercises().addSetAt(0);
    }

    await expect(setCount).toHaveCount(5);
  });

});