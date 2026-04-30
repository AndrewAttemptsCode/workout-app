import { type Page } from "@playwright/test";
import NavBar from "./Navbar";
import HomePage from "./HomePage";
import WorkoutsPage from "./WorkoutsPage";
import ExercisesPage from "./ExercisesPage";

class PageManager {
  readonly page: Page;
  private readonly navbar: NavBar;
  private readonly homepage: HomePage;
  private readonly workoutspage: WorkoutsPage;
  private readonly exercisespage: ExercisesPage;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new NavBar(this.page);
    this.homepage = new HomePage(this.page);
    this.workoutspage = new WorkoutsPage(this.page);
    this.exercisespage = new ExercisesPage(this.page);
  }

  nav() {
    return this.navbar;
  }

  home() {
    return this.homepage;
  }

  workouts() {
    return this.workoutspage;
  }

  exercises() {
    return this.exercisespage;
  }
}

export default PageManager;
