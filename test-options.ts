import { test as base } from "@playwright/test";
import PageManager from "./pages/PageManager";

type TestOptions = {
  pm: PageManager;
}

export const test = base.extend<TestOptions>({
  page: async ({ page }, run) => {
    await page.goto("/");
    await run(page);
  },

  pm: async ({ page }, run) => {
    await run(new PageManager(page));
  },
});
