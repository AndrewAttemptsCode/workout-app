import { expect } from "@playwright/test";
import { test } from "../test-options";

test.describe("Navbar functionality", () => {
  test("user can navigate to homepage", async ({ pm }) => {
    await pm.nav().goToHome();
    await expect(pm.page.getByRole("heading", { name: /track. train. transform./i })).toBeVisible();
  });

  test("user can navigate to workouts page", async ({ pm }) => {
    await pm.nav().goToWorkouts();
    await expect(pm.page.getByRole("button", { name: /add new workout/i })).toBeVisible();
  });

  test("user can navigate to exercises page", async ({ pm }) => {
    await pm.nav().goToExercises();
    await expect(pm.page.getByRole("button", { name: /add new exercise/i })).toBeVisible();
  });

  test("user can navigate to dashboard page", async ({ pm }) => {
    await pm.nav().goToDashboard();
    await expect(pm.page.getByRole("heading", { name: /weekly tracker/i })).toBeVisible();
  });

});
