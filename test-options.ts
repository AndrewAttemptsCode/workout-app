import { test as base } from "@playwright/test";
import PageManager from "./pages/PageManager";
import { workoutWithExercise } from "./setups/workouts.setup";

type TestOptions = {
  pm: PageManager;
  workoutWithExercise: Awaited<ReturnType<typeof workoutWithExercise>>;
}

export const test = base.extend<TestOptions>({
  page: async ({ page }, run) => {
    await page.goto("/");
    await run(page);
  },

  pm: async ({ page }, run) => {
    await run(new PageManager(page));
  },

  workoutWithExercise: async({ pm }, run) => {
    const data = await workoutWithExercise(pm);
    await run(data);
  },
  
});
