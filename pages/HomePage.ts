import { Locator, Page } from "@playwright/test";

class HomePage {
  private readonly page: Page;
  private readonly workoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.workoutButton = this.page.getByRole("button", { name: /get started/i });
  }

  async clickStartWorkout() {
    await this.workoutButton.click();
  }
}

export default HomePage;
