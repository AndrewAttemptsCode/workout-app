import { expect } from "@playwright/test";
import { test } from "../test-options";

test.describe("Timer page functionality", () => {
  test("display shows current exercise set details", async ({ loadWorkout: _, pm }) => {
    const timerDisplay = pm.timer().display();

    await expect(timerDisplay).toContainText(/shoulder press/i);
    await expect(timerDisplay).toContainText(/reps: 5/i);
    await expect(timerDisplay).toContainText(/weight: 5/i);
  });
});
