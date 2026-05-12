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
}

export default TimerPage;
