import { Page, Locator } from "@playwright/test";

class ExercisesPage {
  private readonly page: Page;
  private readonly addExerciseButton: Locator;
  private readonly exerciseItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addExerciseButton = this.page.getByRole("button", { name: /add new exercise/i });
    this.exerciseItems = this.page.getByTestId("exercise-item");
  }

  async addNewExercise() {
    await this.addExerciseButton.click();
  }

  async removeExerciseAt(index: number) {
    const exerciseItem = this.exerciseItems.nth(index);
    await this.setItemLock(exerciseItem, "unlock");
    await exerciseItem.getByRole("button", { name: /remove item/i }).click();
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

export default ExercisesPage;