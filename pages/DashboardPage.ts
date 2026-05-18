import { expect, Page } from "@playwright/test";

class DashboardPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  weeklyTracker() {
    return this.page.getByRole("region", { name: /weekly tracker/i });
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
}

export default DashboardPage;
