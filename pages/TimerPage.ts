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
    return this.breakdown().getByRole("button", { name: /exercise item/i });
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
}

export default TimerPage;
