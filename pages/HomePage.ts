import { Locator, Page, expect } from "@playwright/test";

class HomePage {
  private readonly page: Page;
  private readonly workoutButton: Locator;
  private readonly faqItems: Locator;
  private readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.workoutButton = this.page.getByRole("button", { name: /get started/i });
    const faqSection = this.page.locator("section").filter({ has: this.page.getByRole("heading", { name: /faq/i })});
    this.faqItems = faqSection.getByRole("button");
    this.footer = this.page.locator("footer");
  }

  async clickStartWorkout() {
    await this.workoutButton.click();
  }

  async faqItem(faqItemIndex: number) {
    const items = await this.faqItems.all();
    return items[faqItemIndex];
  }

  async assertSocialLinks(socials: Record<string, string>) {
    for (const [key, expectedHref] of Object.entries(socials)) {
      const link = this.footer.getByRole("link", { name: key });
      await expect(link).toHaveAttribute("href", expectedHref);
    };
  }
}

export default HomePage;
