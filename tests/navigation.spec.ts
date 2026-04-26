import { expect } from "@playwright/test";
import { test } from "../test-options";

test.describe("Navbar functionality", () => {
  test("user can navigate to homepage", async ({ page, pm }) => {
    await pm.nav().goToHome();
    await expect(page.getByRole("heading", { name: /track. train. transform./i })).toBeVisible();
  });

  test("user can navigate to workouts page", async ({ page, pm }) => {
    await pm.nav().goToWorkouts();
    await expect(page.getByRole("button", { name: /add new workout/i })).toBeVisible();
  });

  test("user can navigate to exercises page", async ({ page, pm }) => {
    await pm.nav().goToExercises();
    await expect(page.getByRole("button", { name: /add new exercise/i })).toBeVisible();
  });

  test("user can navigate to dashboard page", async ({ page, pm }) => {
    await pm.nav().goToDashboard();
    await expect(page.getByRole("heading", { name: /weekly tracker/i })).toBeVisible();
  });

});
