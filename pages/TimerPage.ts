import { Page } from "@playwright/test";

class TimerPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}

export default TimerPage;
