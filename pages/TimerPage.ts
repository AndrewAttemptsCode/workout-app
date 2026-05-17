import { Page } from "@playwright/test";

class TimerPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  display() {
    return this.page.getByRole("region", { name: /workout timer display/i });
  }

  controls() {
    return this.page.getByRole("region", { name: /workout timer controls/i });
  }

  breakdown() {
    return this.page.getByRole("region", { name: /workout breakdown/i });
  }

  getWorkoutMenu() {
    return this.breakdown().getByRole("button", { name: /upper body/i });
  }

  getExerciseList() {
    return this.breakdown().getByLabel(/^exercise item$/i);
  }

  getExercise(exerciseIndex: number) {
    const exerciseList = this.getExerciseList();
    return exerciseList.nth(exerciseIndex);
  }

  async toggleExerciseDetails(exerciseIndex: number, state: "collapse" | "expand") {
    const workoutMenuExpanded = await this.getWorkoutMenu().getAttribute("aria-expaned");
    
    if (workoutMenuExpanded === "false") {
      await this.getWorkoutMenu().click();
    }

    const exercise = this.getExercise(exerciseIndex);
    const exerciseButton = exercise.getByRole("button", { name: /toggle exercise/i });
    const exerciseExpanded = await exerciseButton.getAttribute("aria-expanded");
    
    if (exerciseExpanded === "true" && state === "collapse") {
      await exerciseButton.click();  
    }

    if (exerciseExpanded === "false" && state === "expand") {
      await exerciseButton.click();
    }

    return exercise.getByLabel(/^exercise breakdown$/i);
  }

  async toggleExerciseList(state: "collapse" | "expand") {
    const listExpanded = await this.getWorkoutMenu().getAttribute("aria-expanded");
    if (listExpanded === "true" && state === "collapse") {
      await this.getWorkoutMenu().click();
    }

    if (listExpanded === "false" && state === "expand") {
      await this.getWorkoutMenu().click();
    }
  }

  async startWorkout() {
    const controls = this.controls();
    await controls.getByRole("button", { name: /start workout/i }).click();
  }

  async completeSet() {
    const completeSetButton = this.controls().getByRole("button", { name: /complete set/i });
    await completeSetButton.click();
    return completeSetButton;
  }

  async finishWorkout() {
    const finishWorkoutButton = this.controls().getByRole("button", { name: /finish workout/i });
    await finishWorkoutButton.click();
  }
}

export default TimerPage;
