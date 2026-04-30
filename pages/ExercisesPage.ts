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
}

export default ExercisesPage;