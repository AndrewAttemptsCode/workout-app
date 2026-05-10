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
    if (buttonStatus === "true" && status === "lock") {
      await lockButton.click();
    }
    if (buttonStatus === "false" && status === "unlock") {
      await lockButton.click();
    }
  }

  getAddExerciseLink(workoutItem: Locator) {
    return workoutItem.getByRole("link", { name: /add/i });
  }

  async clickAddExercise(workoutItem: Locator) {
    await this.getAddExerciseLink(workoutItem).click();
  }

  getExerciseList(index: number) {
    const workoutItem = this.getWorkoutAt(index);
    return workoutItem.locator("tbody tr");
  }

  async removeExerciseFromWorkout(workoutIndex: number, exerciseIndex: number) {
    const workoutItem = await this.getWorkoutAt(workoutIndex);
    await this.setItemLock(workoutItem, "unlock");
    const exerciseList = this.getExerciseList(workoutIndex);
    await exerciseList.nth(exerciseIndex).getByRole("button", { name: /remove.*workout/i }).click();
  }

}

export default WorkoutsPage;
