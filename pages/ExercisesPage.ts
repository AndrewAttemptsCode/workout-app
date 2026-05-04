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

  getExerciseAt(index: number) {
    return this.exerciseItems.nth(index);
  }

  getExerciseTitleInputAt(index: number) {
    return this.getExerciseAt(index).getByLabel("exercise name");
  }

  async setExerciseTitle(index: number, title: string) {
    await this.getExerciseTitleInputAt(index).fill(title);
  }

  async addSetAt(index: number) {
    const exerciseItem = this.getExerciseAt(index);
    await this.setItemLock(exerciseItem, "unlock");
    await exerciseItem.getByRole("button", { name: /add new set/i }).click();
  }

  totalSetsDisplayCount(item: Locator) {
    return item.getByRole("heading").filter({ hasText: /total sets/i });
  }

  getExerciseSetsAt(index: number) {
    const exerciseItem = this.getExerciseAt(index);
    return exerciseItem.getByTestId("exercise-set");
  }

  async removeSetAt(exerciseIndex: number, setIndex: number) {
    const exerciseSets = this.getExerciseSetsAt(exerciseIndex);
    const exerciseSet = exerciseSets.nth(setIndex);
    await exerciseSet.getByRole("button", { name: /remove set from exercise/i }).click();
  }
}

export default ExercisesPage;