import { Locator, Page } from "@playwright/test";

class WorkoutsPage {
  readonly page: Page;
  private readonly addWorkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addWorkoutButton = this.page.getByRole("button", { name: /add new workout/i });
  }

  async addNewWorkout() {
    await this.addWorkoutButton.click();
  }
  
}

export default WorkoutsPage;
