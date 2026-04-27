import { Locator, Page } from "@playwright/test";

class WorkoutsPage {
  readonly page: Page;
  private readonly addWorkoutButton: Locator;
  private readonly workoutItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addWorkoutButton = this.page.getByRole("button", { name: /add new workout/i });
    this.workoutItems = this.page.getByTestId("workout-item");
  }

  async addNewWorkout() {
    await this.addWorkoutButton.click();
  }

  async removeWorkoutAt(index: number) {
    const workoutItem = this.workoutItems.nth(index);
    await workoutItem.getByRole("button", { name: /remove item/i }).click();
  }

}

export default WorkoutsPage;
