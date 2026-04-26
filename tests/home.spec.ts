import { expect } from "@playwright/test";
import { test } from "../test-options";

test.describe("Home page functionality", () => {
  test("CTA button navigates to workouts page", async ({ pm }) => {
    await pm.home().clickStartWorkout();
    await expect(pm.page.getByRole("button", { name: /add new workout/i })).toBeVisible();
  })

  test("FAQ accordion expands and collapses", async ({ pm }) => {
    const faqItem = await pm.home().faqItem(0);

    await faqItem.click();
    await expect(faqItem).toHaveAttribute("aria-expanded", "true");
    
    await faqItem.click();
    await expect(faqItem).toHaveAttribute("aria-expanded", "false");
  })
});