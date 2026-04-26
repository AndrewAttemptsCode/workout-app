import { type Locator, type Page } from "@playwright/test";

class NavBar {
  private readonly page: Page;
  private readonly homeLink: Locator;
  private readonly workoutsLink: Locator;
  private readonly exercisesLink: Locator;
  private readonly dashboardLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = this.page.locator("header").getByRole("link", { name: /storm lifts/i });
    this.workoutsLink = this.page.locator("nav").getByRole("link", { name: /workouts/i });
    this.exercisesLink = this.page.locator("nav").getByRole("link", { name: /exercises/i });
    this.dashboardLink = this.page.locator("nav").getByRole("link", { name: /dashboard/i });
  }

  async goToHome() {
    await this.homeLink.click();
  }

  async goToWorkouts() {
    await this.workoutsLink.click();
  }

  async goToExercises() {
    await this.exercisesLink.click();
  }

  async goToDashboard() {
    await this.dashboardLink.click();
  }
};

export default NavBar;
