import { test } from "../test-options";

test.describe("Dashboard functionality", () => {
  test("weekly tracker marks todays workout day as complete", async ({ pm, completeWorkout: _ }) => {
    await pm.dashboard().assertWeeklyDayComplete();
  });
});
