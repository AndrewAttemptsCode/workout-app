import { expect, Page } from "@playwright/test";

class NotFoundPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async assertPageVisible() {
    await expect(this.page.getByLabel(/error/i)).toContainText(/404 - not found/i);
  }
}

export default NotFoundPage;