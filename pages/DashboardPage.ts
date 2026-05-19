import { expect, Page } from "@playwright/test";

type QuickStats = "last worked out" | "last workout complete"| "workouts complete" | "exercises complete" | "sets complete" | "reps complete" | "heaviest weight lifted" | "total workout duration";

class DashboardPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  weeklyTracker() {
    return this.page.getByRole("region", { name: /weekly tracker/i });
  }

  quickStats() {
    return this.page.getByRole("region", { name: /quick stats/i });
  }

  workoutsPerMonth() {
    return this.page.getByRole("region", { name: /workouts per month/i });
  }

  getWeeklyTrackerDays() {
    return this.weeklyTracker().getByRole("listitem");
  }

  async assertWeeklyDayComplete() {
    const days = this.getWeeklyTrackerDays();

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const todaysDay = daysOfWeek[new Date().getDay()];

    for (const day of await days.all()) {
      const text = await day.textContent();

      if (text?.includes(todaysDay)) {
        await expect(day).toContainText(/is complete$/i);
      } else {
        await expect(day).toContainText(/is not complete$/i);
      }
    }
  }

  async assertAllDaysIncomplete() {
    const days = this.getWeeklyTrackerDays();

    for (const day of await days.all()) {
      await expect(day).toContainText("is not complete");
    }
  }

  async resetStats(stat: "weekly tracker" | "quick stats" | "workouts per month") {
    const region = this.page.getByRole("region", { name: new RegExp(`^${stat}$`, "i") });
    const resetButton = region.getByRole("button", { name: /^reset stats/i });
    await resetButton.click();
  }

  quickStat(quickStat: QuickStats) {
    const quickStats = this.quickStats();
    return quickStats.getByRole("listitem").filter({ has: this.page.getByRole("heading", { name: new RegExp(`^${quickStat}$`, "i") }) });
  }

  async assertQuickStatValue(quickStat: QuickStats, value: string) {
    const stat = this.quickStat(quickStat);
    await expect(stat).toContainText(new RegExp(`${value}`, "i"));
  }
}

export default DashboardPage;
