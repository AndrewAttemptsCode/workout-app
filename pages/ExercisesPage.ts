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
    if (buttonStatus === "true" && status === "lock") {
      await lockButton.click();
    }
    if (buttonStatus === "false" && status === "unlock") {
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
    
    const removeSetButton = exerciseSet.getByRole("button", { name: /remove set from exercise/i });
    
    if (await removeSetButton.isDisabled()) return;
    
    await removeSetButton.click();
  }

  async getExerciseSetValues(exerciseIndex: number, setIndex: number) {
    const exerciseSets = this.getExerciseSetsAt(exerciseIndex);
    const exerciseSet = exerciseSets.nth(setIndex);

    const reps = exerciseSet.getByRole("spinbutton", { name: /reps/i });
    const weight = exerciseSet.getByRole("spinbutton", { name: /weight/i });
    const rest = exerciseSet.getByRole("spinbutton", { name: /rest/i });

    return { reps, weight, rest };
  }

  async updateSetValues(exerciseIndex: number, setIndex: number, repsValue: number | string, weightValue: number | string, restValue: number | string) {
    const { reps, weight, rest } = await this.getExerciseSetValues(exerciseIndex, setIndex);
    await reps.fill(String(repsValue));
    await weight.fill(String(weightValue));
    await rest.fill(String(restValue));

    return { reps, weight, rest };
  }

  async openAddToWorkoutMenu(index: number) {
    const exerciseItem = this.getExerciseAt(index);
    await this.setItemLock(exerciseItem, "lock");
    await exerciseItem.getByRole("button", { name: /add to workout/i }).click();
    const workoutMenu = exerciseItem.getByRole("region", { name: /select workout/i });
    return workoutMenu;
  }

  async closeAddToWorkoutMenu(index: number) {
    const exerciseItem = this.getExerciseAt(index);

    await this.setItemLock(exerciseItem, "lock");

    await exerciseItem.getByRole("button", { name: /back/i }).click();
  }

  async clickCreateWorkoutFromMenu(index: number) {
    const workoutMenu = await this.openAddToWorkoutMenu(index);
    await workoutMenu.getByRole("link", { name: /create/i }).click();
  }

  async addExerciseToWorkout(exerciseIndex: number, workoutIndex: number) {
    const workoutMenu = await this.openAddToWorkoutMenu(exerciseIndex);
    const workoutItems = workoutMenu.getByRole("listitem");
    await workoutItems.nth(workoutIndex).click();
  }

}

export default ExercisesPage;