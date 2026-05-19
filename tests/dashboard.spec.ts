import { expect } from "@playwright/test";
import { test } from "../test-options";

test.describe("Dashboard functionality", () => {
  test("weekly tracker marks todays workout day as complete", async ({ pm, completeWorkout: _ }) => {
    await pm.dashboard().assertWeeklyDayComplete();
  });

  test("weekly tracker reset stats button clears today as complete", async ({ pm, completeWorkout: _ }) => {
    await pm.dashboard().assertWeeklyDayComplete();

    await pm.dashboard().resetStats("weekly tracker");

    await pm.dashboard().assertAllDaysIncomplete();
  });

  test("quick stats render", async ({ pm, completeWorkout: _ }) => {
    await expect(pm.dashboard().quickStat("last worked out")).toBeVisible();
    await expect(pm.dashboard().quickStat("exercises complete")).toBeVisible();
    await expect(pm.dashboard().quickStat("heaviest weight lifted")).toBeVisible();
    await expect(pm.dashboard().quickStat("last workout complete")).toBeVisible();
    await expect(pm.dashboard().quickStat("reps complete")).toBeVisible();
    await expect(pm.dashboard().quickStat("sets complete")).toBeVisible();
    await expect(pm.dashboard().quickStat("total workout duration")).toBeVisible();
    await expect(pm.dashboard().quickStat("workouts complete")).toBeVisible();
  });

  test("quick stats update after workout complete", async ({ pm, completeWorkout: _ }) => {
    await pm.dashboard().assertQuickStatValue("last workout complete", "upper body");
    await pm.dashboard().assertQuickStatValue("sets complete", "1");
    await pm.dashboard().assertQuickStatValue("exercises complete", "1");
  });

  test("quick stats reset stats button clears stored values", async ({ pm, completeWorkout: _ }) => {
    await pm.dashboard().resetStats("quick stats");

    await pm.dashboard().assertQuickStatValue("last workout complete", "none yet");
    await pm.dashboard().assertQuickStatValue("sets complete", "0");
    await pm.dashboard().assertQuickStatValue("exercises complete", "0");
  });
});
