import { Locator, Page } from "@playwright/test";

class HomePage {
  private readonly page: Page;
  private readonly workoutButton: Locator;
  private readonly faqItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.workoutButton = this.page.getByRole("button", { name: /get started/i });
    const faqSection = this.page.locator("section").filter({ has: this.page.getByRole("heading", { name: /faq/i })});
    this.faqItems = faqSection.getByRole("button");
  }

  async clickStartWorkout() {
    await this.workoutButton.click();
  }

  async faqItem(faqItemIndex: number) {
    const items = await this.faqItems.all();
    return items[faqItemIndex];
  }
}

export default HomePage;
