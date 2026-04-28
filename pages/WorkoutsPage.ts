import { Locator, Page } from "@playwright/test";

class WorkoutsPage {
  private readonly page: Page;
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

  getWorkoutAt(index: number) {
    return this.workoutItems.nth(index);
  }

  getWorkoutTitleInputAt(index: number) {
    return this.getWorkoutAt(index).getByLabel("workout name");
  }

}

export default WorkoutsPage;
