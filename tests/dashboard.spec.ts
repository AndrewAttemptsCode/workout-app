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
});
