import { expect } from "@playwright/test";
import { test } from "../test-options";

test.describe("Home page functionality", () => {
  test("CTA button navigates to workouts page", async ({ pm }) => {
    await pm.home().clickStartWorkout();
    await expect(pm.page.getByRole("button", { name: /add new workout/i })).toBeVisible();
  })
});