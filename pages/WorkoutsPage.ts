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
    await this.setItemLock(workoutItem, "unlock");
    await workoutItem.getByRole("button", { name: /remove item/i }).click();
  }

  getWorkoutAt(index: number) {
    return this.workoutItems.nth(index);
  }

  getWorkoutTitleInputAt(index: number) {
    return this.getWorkoutAt(index).getByLabel("workout name");
  }

  async setWorkoutTitle(index: number, title: string) {
    await this.getWorkoutTitleInputAt(index).fill(title);
  }

  async setItemLock(item: Locator, status: "lock" | "unlock") {
    const lockButton = item.getByRole("button", { name: /edit item/i });
    const buttonStatus = await lockButton.getAttribute("aria-pressed");
    if (buttonStatus && status === "lock") {
      await lockButton.click();
    }
    if (!buttonStatus && status === "unlock") {
      await lockButton.click();
    }
  }

}

export default WorkoutsPage;
